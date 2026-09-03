from app.database import Base
from sqlalchemy import Column, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func


class SavedJob(Base):
    __tablename__ = "saved_jobs"

    id = Column(Integer, primary_key=True,index=True)
    user_id = Column(Integer,ForeignKey("users.id"))
    job_id = Column(Integer,ForeignKey("jobs.id"))
    created_at = Column(DateTime(timezone=True),server_default=func.now())
    
    user = relationship("User",back_populates="saved_jobs")
    job = relationship("Job",back_populates="saved_by")