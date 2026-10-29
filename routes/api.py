# API routes for Next.js frontend
from flask import Blueprint, jsonify, request
from models import job_search_model

api_bp = Blueprint('api', __name__, url_prefix='/api')

@api_bp.route("/jobs", methods=["GET"])
def get_jobs():
    """Get all jobs or search jobs based on query parameter"""
    search = request.args.get("search", "").strip()
    
    if not search:
        jobs = job_search_model.jobs
    else:
        jobs = job_search_model.search_jobs(search)
    
    return jsonify({"jobs": jobs, "search": search})

@api_bp.route("/jobs/<int:job_id>", methods=["GET"])
def get_job(job_id):
    """Get a specific job by ID"""
    job = job_search_model.get_job_by_id(job_id)
    
    if not job:
        return jsonify({"error": "Job not found"}), 404
    
    return jsonify({"job": job})

@api_bp.route("/jobs", methods=["POST"])
def create_job():
    """Create a new job"""
    data = request.get_json()
    
    required_fields = ["title", "category", "employer", "location", "salary", "phone", "description"]
    
    # Validate required fields
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing required field: {field}"}), 400
    
    # Add job
    new_job = job_search_model.add_job({
        "title": data["title"],
        "title_hi": data.get("title_hi", data["title"]),
        "category": data["category"],
        "employer": data["employer"],
        "employer_hi": data.get("employer_hi", data["employer"]),
        "location": data["location"],
        "location_hi": data.get("location_hi", data["location"]),
        "salary": data["salary"],
        "salary_hi": data.get("salary_hi", data["salary"]),
        "phone": data["phone"],
        "description": data["description"],
        "description_hi": data.get("description_hi", data["description"])
    })
    
    return jsonify({"job": new_job}), 201

@api_bp.route("/jobs/<int:job_id>", methods=["DELETE"])
def delete_job(job_id):
    """Delete a job by ID"""
    success = job_search_model.delete_job(job_id)
    
    if not success:
        return jsonify({"error": "Job not found"}), 404
    
    return jsonify({"message": "Job deleted successfully"})

@api_bp.route("/profile/<employer_name>", methods=["GET"])
def get_employer_jobs(employer_name):
    """Get all jobs for a specific employer"""
    jobs = job_search_model.get_jobs_by_employer(employer_name)
    return jsonify({"jobs": jobs, "employer": employer_name})
