from flask import Flask, render_template, request, jsonify 
import json
from sentence_transformers import SentenceTransformer, util
import torch
import speech_recognition as sr
import io 
from pydub import AudioSegment 
from map import HINDI_TO_ENGLISH_MAP

app = Flask(__name__)

model = SentenceTransformer("paraphrase-multilingual-MiniLM-L12-v2")
print("Multilingual Model loaded.")

def preprocess_query(query):
    processed_query = query.lower()
    for hindi_term, english_term in HINDI_TO_ENGLISH_MAP.items():
        processed_query = processed_query.replace(hindi_term, english_term)
    return processed_query




# --- Load and embed jobs (no changes here) ---
def load_jobs():
    with open("jobs.json", "r", encoding="utf-8") as f:
        return json.load(f)

jobs = load_jobs()
job_texts = [f"{job.get('title','')} {job.get('description','')} {job.get('category','')}" for job in jobs]
job_embeddings = model.encode(job_texts, convert_to_tensor=True)


# --- Voice transcription route (no changes here) ---
@app.route("/transcribe", methods=["POST"])
def transcribe_audio():
    if "audio_data" not in request.files:
        return jsonify({"error": "No audio file found"}), 400

    audio_file = request.files["audio_data"]
    
    try:
        audio = AudioSegment.from_file(audio_file, format=audio_file.content_type.split('/')[-1])
        wav_io = io.BytesIO()
        audio.export(wav_io, format="wav")
        wav_io.seek(0)

        r = sr.Recognizer()
        with sr.AudioFile(wav_io) as source:
            audio_data = r.record(source)
        
        # We can specify the language for better accuracy if needed
        text = r.recognize_google(audio_data, language="hi-IN")
        
        print(f"🎤 Transcribed Text: {text}")
        return jsonify({"transcript": text})

    except sr.UnknownValueError:
        print("Google Speech Recognition could not understand audio")
        return jsonify({"error": "Could not understand audio"}), 400
    except sr.RequestError as e:
        print(f"Could not request results from Google service; {e}")
        return jsonify({"error": "API unavailable"}), 500
    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": "An internal error occurred"}), 500


# --- Main search route (UPDATED) ---
@app.route("/")
def home():
    search = request.args.get("search", "").strip()
    
    if not search:
        return render_template("index.html", jobs=jobs, search="")
    
    # 2. Preprocess the search query using the keyword map first
    processed_search = preprocess_query(search)
    print(f"Original Query: '{search}', Processed by Map: '{processed_search}'")

    # 3. Feed the preprocessed query to the multilingual model
    query_embedding = model.encode(processed_search, convert_to_tensor=True)
    
    # --- The rest of the search logic remains the same ---
    cosine_scores = util.cos_sim(query_embedding, job_embeddings)[0]
    k = min(10, len(jobs))
    top_results = torch.topk(cosine_scores, k=k)
    filtered_jobs = [jobs[idx] for idx in top_results.indices if idx < len(jobs)]
    
    print(f"\n🔎 Final Query for Model: {processed_search}")
    for rank, (idx, score) in enumerate(zip(top_results.indices, top_results.values)):
        if idx >= len(jobs):
            continue
        job = jobs[idx]
        title = job.get("title", "No title")
        category = job.get("category", "No category")
        snippet = job.get("description", "")[:100]
        print(f"{rank+1}. {title} ({category}) - Score: {score.item()*100:.2f}%\n   Desc: {snippet}...")
        
    # Pass the original search term back to the template to display in the search box
    return render_template("index.html", jobs=filtered_jobs, search=search)


# --- All other routes remain the same ---
@app.route("/job/<int:job_id>")
def job_detail(job_id):
    job = next((j for j in jobs if j["id"] == job_id), None)
    if job:
        return render_template("job_detail.html", job=job)
    else:
        return "Job not found", 404

@app.route("/makeJobs", methods=["GET", "POST"])
def make_jobs():
    global jobs, job_embeddings
    if request.method == "POST":
        new_job = {
            "id": len(jobs) + 1, "title": request.form["title"],
            "category": request.form["category"], "employer": request.form["employer"],
            "location": request.form["location"], "salary": request.form["salary"],
            "phone": request.form["phone"], "description": request.form.get("description", ""),
        }
        jobs.append(new_job)
        with open("jobs.json", "w", encoding="utf-8") as f:
            json.dump(jobs, f, indent=4, ensure_ascii=False)
        text = f"{new_job['title']} {new_job['category']} {new_job['description']}"
        embedding = model.encode(text, convert_to_tensor=True)
        job_embeddings = torch.cat([job_embeddings, embedding.unsqueeze(0)], dim=0)
        return render_template("job_detail.html", job=new_job)
    categories = ["plumbing", "painting", "electrical", "carpentry", "other"]
    return render_template("make_jobs.html", categories=categories)


@app.route("/profile", methods=["GET", "POST"])
def profile():
    global jobs
    JOBS_FILE = "jobs.json"
    if request.method == "POST":
        job_id = int(request.form.get("job_id"))
        jobs = [job for job in jobs if job["id"] != job_id]
        with open(JOBS_FILE, "w", encoding="utf-8") as f:
            json.dump(jobs, f, indent=4, ensure_ascii=False)
    my_jobs = [job for job in jobs if job.get("employer", "").lower() == "hasan"]
    return render_template("profile.html", jobs=my_jobs)

if __name__ == "__main__":
    app.run(debug=True)