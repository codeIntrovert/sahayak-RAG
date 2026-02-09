# Main Flask application file
from flask import Flask
from config import Config
from routes import register_blueprints

# Create Flask application
app = Flask(__name__)
app.config.from_object(Config)

# Register all blueprints
register_blueprints(app)

if __name__ == "__main__":
    app.run(host="0.0.0.0")
