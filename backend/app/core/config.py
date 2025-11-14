import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = "Granola AI"
    PROJECT_VERSION: str = "1.0.0"
    SQLALCHEMY_DATABASE_URL: str = os.getenv("DATABASE_URL")
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY")

settings = Settings()