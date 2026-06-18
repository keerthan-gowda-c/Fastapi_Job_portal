from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.saved_jobs import SavedJob
from app.models.job import Job
from app.models.user import User
from app.dependencies.auth import get_current_user
from app.dependencies.roles import require_role

router = APIRouter(prefix="/saved-jobs",tags=["Saved Job"])

@router.post("/{job_id}")
def save_job(
    job_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
    require_role("jobseeker")
)
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

    existing = (
        db.query(SavedJob)
        .filter(
            SavedJob.user_id == current_user.id,
            SavedJob.job_id == job_id
        )
        .first()
    )

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Job already saved"
        )

    saved_job = SavedJob(
        user_id=current_user.id,
        job_id=job_id
    )

    db.add(saved_job)
    db.commit()

    return {
        "message": "Job saved successfully"
    }


@router.get("/")
def get_saved_jobs(
    db: Session = Depends(get_db),
    current_user: User = Depends(
    require_role("jobseeker")
)
):
    saved_jobs = (
        db.query(SavedJob)
        .filter(
            SavedJob.user_id == current_user.id
        )
        .all()
    )

    return saved_jobs



@router.delete("/{job_id}")
def remove_saved_job(
    job_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
    require_role("jobseeker")
)
):
    saved_job = (
        db.query(SavedJob)
        .filter(
            SavedJob.user_id == current_user.id,
            SavedJob.job_id == job_id
        )
        .first()
    )

    if not saved_job:
        raise HTTPException(
            status_code=404,
            detail="Saved job not found"
        )

    db.delete(saved_job)
    db.commit()

    return {
        "message": "Saved job removed"
    }


