# Configuration file for the application
import os

class Config:
    """Application configuration"""
    DEBUG = True
    JOBS_FILE = "data/jobs.json"
    #MODEL_NAME = "paraphrase-multilingual-MiniLM-L12-v2" #Multilingual model
    MODEL_NAME = "all-MiniLM-L6-v2" # English only model
    MAX_SEARCH_RESULTS = 10