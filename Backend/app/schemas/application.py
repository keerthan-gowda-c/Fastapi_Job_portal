from pydantic import BaseModel
from datetime import datetime

from app.schemas.job import JobResponse
from app.enums.application import ApplicationStatus
from app.schemas.candidate import CandidateResponse

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
    candidate: CandidateResponse | None = None

    class Config:
        from_attributes = True

class RecruiterApplicationResponse(BaseModel):
    id: int
    status: ApplicationStatus
    applied_at: datetime
    job: JobResponse
    user: ApplicantInfo

    class Config:
        from_attributes = True

class ApplicationApplicantResponse(BaseModel):
    id:int 
    status:ApplicationStatus 
    applied_at:datetime 
    user:ApplicantInfo

    class Config: 
        from_attributes = True

class MyApplicationResponse(BaseModel):
    id:int
    status:ApplicationStatus
    applied_at:datetime
    job:JobResponse

    class Config:
        from_attributes = True