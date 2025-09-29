# Audio transcription route
from flask import Blueprint, request, jsonify
from utils import transcribe_audio_file

audio_bp = Blueprint('audio', __name__)

@audio_bp.route("/transcribe", methods=["POST"])
def transcribe_audio():
    """Transcribe uploaded audio to text"""
    if "audio_data" not in request.files:
        return jsonify({"error": "No audio file found"}), 400

    audio_file = request.files["audio_data"]
    result = transcribe_audio_file(audio_file)
    
    if "error" in result:
        status_code = 400 if result["error"] == "Could not understand audio" else 500
        return jsonify(result), status_code
    
    return jsonify(result)