# Job detail route
from flask import Blueprint, render_template
from models import job_search_model

job_detail_bp = Blueprint('job_detail', __name__)

@job_detail_bp.route("/job/<int:job_id>")
def job_detail(job_id):
    """Display detailed view of a specific job"""
    job = job_search_model.get_job_by_id(job_id)
    if job:
        return render_template("job_detail.html", job=job)
    else:
        return "Job not found", 404