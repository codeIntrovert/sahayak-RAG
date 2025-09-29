# Blueprint initialization file
from .main import main
from .job_detail import job_detail_bp
from .make_jobs import make_jobs_bp
from .profile import profile_bp
from .audio import audio_bp

def register_blueprints(app):
    """Register all blueprints with the Flask app"""
    app.register_blueprint(main)
    app.register_blueprint(job_detail_bp)
    app.register_blueprint(make_jobs_bp)
    app.register_blueprint(profile_bp)
    app.register_blueprint(audio_bp)