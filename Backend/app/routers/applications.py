from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)
from app.dependencies.roles import require_role

from sqlalchemy.orm import Session

from app.database import get_db

from app.models.application import Application
from app.models.job import Job
from app.models.user import User
from app.schemas.application import ApplicationStatusUpdate

from app.dependencies.auth import (
    get_current_user
)

router = APIRouter(
    prefix="/applications",
    tags=["Applications"]
)


# Apply for a Job

@router.post("/jobs/{job_id}")
def apply_for_job(
    job_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
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

    existing_application = (
        db.query(Application)
        .filter(
            Application.job_id == job_id,
            Application.user_id == current_user.id
        )
        .first()
    )

    if existing_application:
        raise HTTPException(
            status_code=400,
            detail="Already applied"
        )

    application = Application(
        job_id=job_id,
        user_id=current_user.id
    )

    db.add(application)
    db.commit()
    db.refresh(application)

    return {
        "message": "Application submitted successfully"
    }


# View my Applications

@router.get("/me")
def my_applications(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    )
):

    applications = (
        db.query(Application)
        .filter(
            Application.user_id == current_user.id
        )
        .all()
    )

    return applications


# Recruiter View Application
@router.get("/job/{job_id}")
def job_applications(
    job_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    )
):

    applications = (
        db.query(Application)
        .filter(
            Application.job_id == job_id
        )
        .all()
    )

    return applications


@router.patch("/{application_id}/status")
def update_application_status(
    application_id:int,
    data:ApplicationStatusUpdate,
    db:Session = Depends(get_db),
    current_user: User = Depends(require_role("recruiter"))
):
    application = (
        db.query(Application).filter(Application.id == application_id).first())
    
    if not application:
        raise HTTPException(status_code=404, detail = "Application not found")
    
    application.status = data.status

    db.commit()
    db.refresh(application)

    return application