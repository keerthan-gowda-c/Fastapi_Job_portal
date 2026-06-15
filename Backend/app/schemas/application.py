from pydantic import BaseModel
from datetime import datetime
from enum import Enum


class ApplicationStatus(str, Enum):
    pending = "pending"
    reviewed = "reviewed"
    shortlisted = "shortlisted"
    rejected = "rejected"
    hired = "hired"

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