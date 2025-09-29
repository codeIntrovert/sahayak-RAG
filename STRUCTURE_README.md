# Modular Flask Application Structure

This application has been refactored into a modular structure for better code management and maintainability.

## File Structure

```
sahayak-RAG/
├── app.py                 # Main application entry point
├── config.py              # Application configuration
├── models.py              # Data models and business logic
├── utils.py               # Utility functions (audio processing)
├── routes/                # Route handlers (blueprints)
│   ├── __init__.py       # Blueprint registration
│   ├── main.py           # Home page and search functionality
│   ├── job_detail.py     # Job detail page
│   ├── make_jobs.py      # Job creation functionality
│   ├── profile.py        # User profile and job management
│   └── audio.py          # Audio transcription endpoint
├── data/
│   ├── jobs.json         # Job data storage
│   └── map.py            # Hindi to English mapping
├── templates/            # HTML templates
├── static/               # Static files (CSS, JS, images)
└── requirements.txt      # Python dependencies
```

## Components Description

### `app.py`
- Main application entry point
- Initializes Flask app and registers all blueprints
- Minimal and clean

### `config.py`
- Centralized configuration management
- Contains all application settings
- Easy to modify for different environments

### `models.py`
- `JobSearchModel` class handles all job-related operations
- Encapsulates ML model loading and job search logic
- Manages job data persistence
- Provides clean interface for job operations

### `utils.py`
- Contains utility functions like audio transcription
- Separates helper functions from route logic
- Reusable across different parts of the application

### `routes/` directory
- Each route is in a separate file as a Flask Blueprint
- **main.py**: Home page and search functionality
- **job_detail.py**: Individual job detail pages
- **make_jobs.py**: Job creation form and processing
- **profile.py**: User profile and job management
- **audio.py**: Audio transcription API endpoint
- **__init__.py**: Registers all blueprints with the main app

## Benefits of This Structure

1. **Separation of Concerns**: Each file has a specific responsibility
2. **Maintainability**: Easier to locate and modify specific functionality
3. **Scalability**: Easy to add new routes or features
4. **Testability**: Components can be tested independently
5. **Reusability**: Utility functions and models can be reused
6. **Team Development**: Multiple developers can work on different routes simultaneously

## How to Run

The application runs the same way as before:

```bash
python app.py
```

All functionality remains identical, but the code is now organized in a more maintainable structure.

## Adding New Routes

To add a new route:

1. Create a new file in the `routes/` directory
2. Define your blueprint and routes
3. Import and register it in `routes/__init__.py`
4. The route will automatically be available in the application

Example:
```python
# routes/new_feature.py
from flask import Blueprint, render_template

new_feature_bp = Blueprint('new_feature', __name__)

@new_feature_bp.route("/new-feature")
def new_feature():
    return render_template("new_feature.html")
```

Then add to `routes/__init__.py`:
```python
from .new_feature import new_feature_bp

def register_blueprints(app):
    # ... existing blueprints
    app.register_blueprint(new_feature_bp)
```