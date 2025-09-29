# Models and utilities for job search functionality
import json
import torch
from sentence_transformers import SentenceTransformer, util
from config import Config
from data.map import HINDI_TO_ENGLISH_MAP

class JobSearchModel:
    """Handles job loading, embedding, and search functionality"""
    
    def __init__(self):
        self.model = SentenceTransformer(Config.MODEL_NAME)
        print("Multilingual Model loaded.")
        self.jobs = []
        self.job_embeddings = None
        self.load_jobs()
        self.create_embeddings()
    
    def load_jobs(self):
        """Load jobs from JSON file"""
        try:
            with open(Config.JOBS_FILE, "r", encoding="utf-8") as f:
                self.jobs = json.load(f)
        except FileNotFoundError:
            print(f"Jobs file {Config.JOBS_FILE} not found. Starting with empty job list.")
            self.jobs = []
    
    def save_jobs(self):
        """Save jobs to JSON file"""
        with open(Config.JOBS_FILE, "w", encoding="utf-8") as f:
            json.dump(self.jobs, f, indent=4, ensure_ascii=False)
    
    def create_embeddings(self):
        """Create embeddings for all jobs"""
        if not self.jobs:
            self.job_embeddings = torch.empty(0, self.model.get_sentence_embedding_dimension())
            return
        
        job_texts = [
            f"{job.get('title','')} {job.get('description','')} {job.get('category','')}" 
            for job in self.jobs
        ]
        self.job_embeddings = self.model.encode(job_texts, convert_to_tensor=True)
    
    def preprocess_query(self, query):
        """Preprocess query using Hindi to English mapping"""
        processed_query = query.lower()
        for hindi_term, english_term in HINDI_TO_ENGLISH_MAP.items():
            processed_query = processed_query.replace(hindi_term, english_term)
        return processed_query
    
    def search_jobs(self, query):
        """Search jobs using semantic similarity"""
        if not query.strip():
            return self.jobs
        
        # Preprocess the search query
        processed_search = self.preprocess_query(query)
        print(f"Original Query: '{query}', Processed by Map: '{processed_search}'")
        
        # Create query embedding
        query_embedding = self.model.encode(processed_search, convert_to_tensor=True)
        
        # Calculate similarity scores
        cosine_scores = util.cos_sim(query_embedding, self.job_embeddings)[0]
        k = min(Config.MAX_SEARCH_RESULTS, len(self.jobs))
        top_results = torch.topk(cosine_scores, k=k)
        
        # Filter and return results
        filtered_jobs = [self.jobs[idx] for idx in top_results.indices if idx < len(self.jobs)]
        
        # Debug information
        print(f"\n🔎 Final Query for Model: {processed_search}")
        for rank, (idx, score) in enumerate(zip(top_results.indices, top_results.values)):
            if idx >= len(self.jobs):
                continue
            job = self.jobs[idx]
            title = job.get("title", "No title")
            category = job.get("category", "No category")
            snippet = job.get("description", "")[:100]
            print(f"{rank+1}. {title} ({category}) - Score: {score.item()*100:.2f}%\n   Desc: {snippet}...")
        
        return filtered_jobs
    
    def get_job_by_id(self, job_id):
        """Get a specific job by ID"""
        return next((job for job in self.jobs if job["id"] == job_id), None)
    
    def add_job(self, job_data):
        """Add a new job and update embeddings"""
        new_job = {
            "id": len(self.jobs) + 1,
            **job_data
        }
        self.jobs.append(new_job)
        self.save_jobs()
        
        # Update embeddings
        text = f"{new_job['title']} {new_job['category']} {new_job['description']}"
        embedding = self.model.encode(text, convert_to_tensor=True)
        self.job_embeddings = torch.cat([self.job_embeddings, embedding.unsqueeze(0)], dim=0)
        
        return new_job
    
    def delete_job(self, job_id):
        """Delete a job by ID"""
        original_length = len(self.jobs)
        self.jobs = [job for job in self.jobs if job["id"] != job_id]
        
        if len(self.jobs) < original_length:
            self.save_jobs()
            self.create_embeddings()  # Recreate embeddings after deletion
            return True
        return False
    
    def get_jobs_by_employer(self, employer_name):
        """Get jobs by employer name"""
        return [job for job in self.jobs if job.get("employer", "").lower() == employer_name.lower()]

# Global instance
job_search_model = JobSearchModel()