from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional
from app.database import get_db
from app.models.job import Job, JobType
from app.models.user import User
from app.schemas.job_portal import JobCreate, JobUpdate, JobOut
from app.services.auth_deps import get_current_user, require_employer

router = APIRouter(prefix="/jobs", tags=["Jobs"])


@router.post("/", response_model=JobOut, status_code=201)
def create_job(
    payload: JobCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_employer),
):
    if not current_user.company:
        raise HTTPException(status_code=400, detail="Register a company before posting jobs")
    job = Job(**payload.model_dump(), company_id=current_user.company.id)
    db.add(job)
    db.commit()
    db.refresh(job)
    return job


@router.get("/", response_model=list[JobOut])
def list_jobs(
    skip: int = 0,
    limit: int = 20,
    search: Optional[str] = Query(None, description="Search in title/description"),
    location: Optional[str] = Query(None),
    job_type: Optional[JobType] = Query(None),
    company_id: Optional[int] = Query(None),
    db: Session = Depends(get_db),
):
    q = db.query(Job).filter(Job.is_active == True)
    if search:
        q = q.filter(
            Job.title.ilike(f"%{search}%") | Job.description.ilike(f"%{search}%")
        )
    if location:
        q = q.filter(Job.location.ilike(f"%{location}%"))
    if job_type:
        q = q.filter(Job.job_type == job_type)
    if company_id:
        q = q.filter(Job.company_id == company_id)
    return q.order_by(Job.created_at.desc()).offset(skip).limit(limit).all()


@router.get("/{job_id}", response_model=JobOut)
def get_job(job_id: int, db: Session = Depends(get_db)):
    job = db.query(Job).filter(Job.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job


@router.put("/{job_id}", response_model=JobOut)
def update_job(
    job_id: int,
    payload: JobUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_employer),
):
    job = db.query(Job).filter(Job.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    if job.company_id != current_user.company.id:
        raise HTTPException(status_code=403, detail="Not your job posting")
    for k, v in payload.model_dump(exclude_unset=True).items():
        setattr(job, k, v)
    db.commit()
    db.refresh(job)
    return job


@router.delete("/{job_id}", status_code=204)
def delete_job(
    job_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_employer),
):
    job = db.query(Job).filter(Job.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    if job.company_id != current_user.company.id:
        raise HTTPException(status_code=403, detail="Not your job posting")
    job.is_active = False   # soft delete
    db.commit()
