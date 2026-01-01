# Main Flask application file
from flask import Flask
from flask_cors import CORS
from config import Config
from routes import register_blueprints

# Create Flask application
app = Flask(__name__)
app.config.from_object(Config)

# Enable CORS for Next.js frontend
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# Register all blueprints
register_blueprints(app)

if __name__ == "__main__":
    app.run(debug=True)