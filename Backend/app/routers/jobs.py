from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional

from app.database import get_db
from app.models.job import Job
from app.models.user import User
from app.models.company import Company
from app.models.saved_jobs import SavedJob
from app.models.recruiter import Recruiter
from app.schemas.job import (
    JobCreate,
    JobResponse, JobDetailResponse
)

from app.dependencies.roles import require_role

router = APIRouter(
    prefix="/jobs",
    tags=["Jobs"]
)

def get_recruiter(
    current_user: User,
    db: Session
):
    recruiter = (
        db.query(Recruiter)
        .filter(Recruiter.user_id == current_user.id)
        .first()
    )

    if not recruiter:
        raise HTTPException(
            status_code=404,
            detail="Recruiter profile not found"
        )

    return recruiter

@router.post("/",response_model=JobResponse)
def create_job(
    job: JobCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_role("recruiter")
    )
):
    recruiter = get_recruiter(current_user, db)
    company = (
        db.query(Company)
        .filter(
            Company.recruiter_id == recruiter.id
        )
        .first()
    )

    if not company:
        raise HTTPException(
            status_code=400,
            detail="Create company first"
        )


    db_job = Job(
        title=job.title,
        description=job.description,
        location=job.location,
        salary=job.salary,
        employment_type=job.employment_type.value,
        company_id=company.id
    )

    db.add(db_job)
    db.commit()
    db.refresh(db_job)

    return db_job


@router.get("/my-jobs", response_model=list[JobResponse])
def get_my_jobs(
    db:Session = Depends(get_db),
    current_user: User = Depends(require_role("recruiter"))
    ):
    recruiter = get_recruiter(current_user, db)
    company = (
        db.query(Company).filter(Company.recruiter_id == recruiter.id).first()
    )

    if not company:
        raise HTTPException(
            status_code=404, 
            detail="Company not found"
        )

    jobs = (
        db.query(Job).filter(Job.company_id == company.id).all()
    )

    return jobs


@router.put("/{job_id}",response_model=JobResponse)
def update_job(
    job_id: int,
    job_data: JobCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_role("recruiter")
    )
):
    recruiter = get_recruiter(current_user, db)
    job = (
        db.query(Job)
        .filter(Job.id == job_id)
        .first()
    )

    if not job:
        raise HTTPException(
            status_code=404,
            detail="Job not found"
        )

    if job.company.recruiter_id != recruiter.id:
        raise HTTPException(
            status_code=403,
            detail="Access denied"
        )

    job.title = job_data.title
    job.description = job_data.description
    job.location = job_data.location
    job.salary = job_data.salary

    db.commit()
    db.refresh(job)

    return job



@router.delete("/{job_id}")
def delete_job(
    job_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_role("recruiter")
    )
):
    recruiter = get_recruiter(current_user, db)
    job = (
        db.query(Job)
        .filter(Job.id == job_id)
        .first()
    )

    if not job:
        raise HTTPException(
            status_code=404,
            detail="Job not found"
        )

    if job.company.recruiter_id != recruiter.id:
        raise HTTPException(
            status_code=403,
            detail="Access denied"
        )
    db.query(SavedJob).filter(
        SavedJob.job_id == job.id
    ).delete(synchronize_session=False)
    db.delete(job)
    db.commit()

    return {
        "message": "Job deleted successfully"
    }


# search
@router.get("/", response_model=list[JobResponse])
def search_jobs(
    keyword:Optional[str] = None,
    location:Optional[str] = None,
    salary:Optional[int] = None,
    page:int =1,
    limit:int=10,
    db:Session = Depends(get_db)
):
    query = db.query(Job)

    if keyword:
        query = query.filter(Job.title.ilike(f"%{keyword}%"))

    if location:
        query = query.filter(Job.location.ilike(f"%{location}%"))

    if salary:
        query = query.filter(Job.salary >= salary)

    jobs = query.offset((page - 1) * limit).limit(limit).all()

    return jobs

#


@router.get("/{job_id}", response_model=JobDetailResponse)
def get_job_details(
    job_id: int,
    db: Session = Depends(get_db)
):
    job = (
        db.query(Job)
        .filter(Job.id == job_id)
        .first()
    )

    if not job:
        raise HTTPException(
            status_code=404,
            detail="Job not found"
        )

    return {
        "id": job.id,
        "title": job.title,
        "description": job.description,
        "location": job.location,
        "salary": job.salary,
        "employment_type": job.employment_type,
        "company": job.company,
        "recruiter": job.company.recruiter.user
    }