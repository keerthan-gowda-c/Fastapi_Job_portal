from pydantic import BaseModel
from datetime import datetime
from enum import Enum
from app.schemas.job import JobResponse


class ApplicationStatus(str, Enum):
    pending = "pending"
    reviewed = "reviewed"
    shortlisted = "shortlisted"
    rejected = "rejected"
    hired = "hired"
    withdrawn = "withdrawn"

class ApplicationResponse(BaseModel):
    id: int
    job_id: int
    user_id: int
    status: ApplicationStatus
    applied_at: datetime

    class Config:
        from_attributes = True



class ApplicationStatusUpdate(BaseModel):
    status:ApplicationStatus



class ApplicantInfo(BaseModel):
    id:int
    full_name:str 
    email:str 
    resume_url:str | None=None 

    class Config:
        from_attributes = True


class ApplicationApplicantResponse(BaseModel):
    id:int 
    status:ApplicationStatus 
    applied_at:datetime 
    user:ApplicantInfo

    class Config: 
        from_attribute = True


class MyApplicationResponse(BaseModel):
    id:int
    status:ApplicationStatus
    applied_at:datetime
    job:JobResponse

    class Config:
        from_attribute = True