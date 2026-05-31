from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from app.models.job import JobType
from app.models.application import AppStatus


# ---------- Company ----------
class CompanyCreate(BaseModel):
    name: str
    description: Optional[str] = None
    website: Optional[str] = None
    location: Optional[str] = None


class CompanyOut(CompanyCreate):
    id: int
    owner_id: int
    created_at: datetime

    class Config:
        from_attributes = True


# ---------- Job ----------
class JobCreate(BaseModel):
    title: str
    description: str
    location: Optional[str] = None
    salary_min: Optional[int] = None
    salary_max: Optional[int] = None
    job_type: JobType = JobType.full_time
    skills_required: Optional[str] = None


class JobUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    location: Optional[str] = None
    salary_min: Optional[int] = None
    salary_max: Optional[int] = None
    job_type: Optional[JobType] = None
    skills_required: Optional[str] = None
    is_active: Optional[bool] = None


class JobOut(JobCreate):
    id: int
    is_active: bool
    company_id: int
    created_at: datetime

    class Config:
        from_attributes = True


# ---------- Application ----------
class ApplicationCreate(BaseModel):
    cover_letter: Optional[str] = None
    resume_url: Optional[str] = None


class ApplicationStatusUpdate(BaseModel):
    status: AppStatus


class ApplicationOut(BaseModel):
    id: int
    cover_letter: Optional[str]
    resume_url: Optional[str]
    status: AppStatus
    applicant_id: int
    job_id: int
    applied_at: datetime

    class Config:
        from_attributes = True
