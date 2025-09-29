# Job creation route
from flask import Blueprint, render_template, request
from models import job_search_model

make_jobs_bp = Blueprint('make_jobs', __name__)

@make_jobs_bp.route("/makeJobs", methods=["GET", "POST"])
def make_jobs():
    """Create new job listings"""
    if request.method == "POST":
        job_data = {
            "title": request.form["title"],
            "category": request.form["category"],
            "employer": request.form["employer"],
            "location": request.form["location"],
            "salary": request.form["salary"],
            "phone": request.form["phone"],
            "description": request.form.get("description", ""),
        }
        
        new_job = job_search_model.add_job(job_data)
        return render_template("job_detail.html", job=new_job)
    
    categories = ["plumbing", "painting", "electrical", "carpentry", "other"]
    return render_template("make_jobs.html", categories=categories)