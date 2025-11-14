from fastapi import FastAPI
from app.api import meetings 
app = FastAPI()
app.include_router(meetings.router, prefix="/meetings", tags=["meetings"])

@app.get("/")
def read_root():
    return {"message": "Granola AI - Backend Running!"}