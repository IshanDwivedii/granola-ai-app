from sqlalchemy import Column, Integer, String, Text, DateTime, func
from app.db.session import Base

class Meeting(Base):
    __tablename__ = "meetings"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), index=True)
    raw_text = Column(Text)
    summary = Column(Text)


    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())