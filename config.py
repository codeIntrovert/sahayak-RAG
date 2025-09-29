# Configuration file for the application
import os

class Config:
    """Application configuration"""
    DEBUG = True
    JOBS_FILE = "data/jobs.json"
    MODEL_NAME = "paraphrase-multilingual-MiniLM-L12-v2"
    MAX_SEARCH_RESULTS = 10