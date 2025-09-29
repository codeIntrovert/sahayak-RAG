# Utility functions for audio processing
import speech_recognition as sr
import io 
from pydub import AudioSegment 

def transcribe_audio_file(audio_file):
    """
    Transcribe audio file to text using Google Speech Recognition
    
    Args:
        audio_file: Flask file object containing audio data
        
    Returns:
        dict: {"transcript": str} on success, {"error": str} on failure
    """
    try:
        # Convert audio to WAV format
        audio = AudioSegment.from_file(audio_file, format=audio_file.content_type.split('/')[-1])
        wav_io = io.BytesIO()
        audio.export(wav_io, format="wav")
        wav_io.seek(0)

        # Recognize speech
        r = sr.Recognizer()
        with sr.AudioFile(wav_io) as source:
            audio_data = r.record(source)
        
        # Transcribe with Hindi language support
        text = r.recognize_google(audio_data, language="hi-IN")
        
        print(f"🎤 Transcribed Text: {text}")
        return {"transcript": text}

    except sr.UnknownValueError:
        print("Google Speech Recognition could not understand audio")
        return {"error": "Could not understand audio"}
    except sr.RequestError as e:
        print(f"Could not request results from Google service; {e}")
        return {"error": "API unavailable"}
    except Exception as e:
        print(f"An error occurred: {e}")
        return {"error": "An internal error occurred"}