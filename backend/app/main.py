from dotenv import load_dotenv
load_dotenv()


from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import meetings 
from app.database import Base, engine
#from app.models.meeting import Meeting



Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(meetings.router, prefix="/meetings", tags=["meetings"])

@app.get("/")
def read_root():
    return {"message": "Granola AI - Backend Running!"}