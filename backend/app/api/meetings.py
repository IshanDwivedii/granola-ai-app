from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.db.dependencies import get_db
from app.models.meeting import Meeting
from openai import OpenAI
from app.core.config import settings
import os

router = APIRouter()
client = OpenAI(api_key=settings.OPENAI_API_KEY)


@router.post("/")
def create_meeting(title: str, raw_text: str, db: Session = Depends(get_db)):
    meeting = Meeting(title=title, raw_text=raw_text)
    db.add(meeting)
    db.commit()
    db.refresh(meeting)
    return {"message": "Meeting created successfully"}

@router.get("/")
def list_meetings(db: Session = Depends(get_db)):
    return db.query(Meeting).all()

@router.get("/{meeting_id}")
def get_meeting(meeting_id: int, db: Session = Depends(get_db)):
    meeting = db.query(Meeting).filter(Meeting.id == meeting_id).first()
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")
    return meeting 

@router.post("/{meeting_id}/summarize")
def summarize_meeting(meeting_id: int, db: Session = Depends(get_db)):
    meeting = db.query(Meeting).filter(Meeting.id == meeting_id).first()
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")
    
    if not meeting.raw_text:
        raise HTTPException(status_code=400, detail="Meeting has no text to summarize")

    #send transcript to open ai to summarize
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "Summarize precisely like granola AI does. Use markdown formatting."},
            {"role": "user", "content": meeting.raw_text}
        ]
    )
    summary = response.choices[0].message["content"]

    #save 
    meeting.summary = summary
    db.commit()

    return {"summary": summary}