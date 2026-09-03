from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, nullable=False)
    email = Column(String,unique=True, index=True,nullable=False)
    hashed_password = Column(String, nullable=False)
    role=Column(String,default="jobseeker")
    is_active=Column(Boolean,default=True)
    profile_image = Column(String, nullable=True)
    phone = Column(String, nullable=True)
    location = Column(String, nullable=True)    
    created_at=Column(DateTime(timezone=True),server_default=func.now())

    # Relationships
    candidate = relationship("Candidate", back_populates="user", uselist=False)
    recruiter = relationship("Recruiter",back_populates="user", uselist=False)
    applications = relationship("Application",back_populates="user")
    saved_jobs = relationship("SavedJob",back_populates="user")
    
