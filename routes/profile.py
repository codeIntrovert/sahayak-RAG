# Profile and job management route
from flask import Blueprint, render_template, request
from models import job_search_model

profile_bp = Blueprint('profile', __name__)

@profile_bp.route("/profile", methods=["GET", "POST"])
def profile():
    """User profile page with job management functionality"""
    if request.method == "POST":
        job_id = int(request.form.get("job_id"))
        job_search_model.delete_job(job_id)
    
    # Get jobs for the specific user (Hasan in this case)
    my_jobs = job_search_model.get_jobs_by_employer("hasan")
    return render_template("profile.html", jobs=my_jobs)