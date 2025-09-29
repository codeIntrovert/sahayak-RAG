# Main route - Home page and search functionality
from flask import Blueprint, render_template, request
from models import job_search_model

main = Blueprint('main', __name__)

@main.route("/")
def home():
    """Home page with job search functionality"""
    search = request.args.get("search", "").strip()
    
    if not search:
        jobs = job_search_model.jobs
    else:
        jobs = job_search_model.search_jobs(search)
    
    # Pass the original search term back to the template to display in the search box
    return render_template("index.html", jobs=jobs, search=search)