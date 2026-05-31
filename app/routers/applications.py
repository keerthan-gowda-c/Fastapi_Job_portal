from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.application import Application
from app.models.job import Job
from app.models.user import User
from app.schemas.job_portal import ApplicationCreate, ApplicationOut, ApplicationStatusUpdate
from app.services.auth_deps import get_current_user, require_employer

router = APIRouter(prefix="/applications", tags=["Applications"])


@router.post("/jobs/{job_id}/apply", response_model=ApplicationOut, status_code=201)
def apply_for_job(
    job_id: int,
    payload: ApplicationCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if current_user.role != "jobseeker":
        raise HTTPException(status_code=403, detail="Only jobseekers can apply")

    job = db.query(Job).filter(Job.id == job_id, Job.is_active == True).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found or closed")

    already = db.query(Application).filter(
        Application.applicant_id == current_user.id,
        Application.job_id == job_id,
    ).first()
    if already:
        raise HTTPException(status_code=400, detail="Already applied to this job")

    app = Application(
        **payload.model_dump(),
        applicant_id=current_user.id,
        job_id=job_id,
    )
    db.add(app)
    db.commit()
    db.refresh(app)
    return app


@router.get("/my", response_model=list[ApplicationOut])
def my_applications(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return (
        db.query(Application)
        .filter(Application.applicant_id == current_user.id)
        .order_by(Application.applied_at.desc())
        .all()
    )


@router.get("/jobs/{job_id}", response_model=list[ApplicationOut])
def applications_for_job(
    job_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_employer),
):
    job = db.query(Job).filter(Job.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    if job.company_id != current_user.company.id:
        raise HTTPException(status_code=403, detail="Not your job posting")
    return db.query(Application).filter(Application.job_id == job_id).all()


@router.patch("/{application_id}/status", response_model=ApplicationOut)
def update_status(
    application_id: int,
    payload: ApplicationStatusUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_employer),
):
    app = db.query(Application).filter(Application.id == application_id).first()
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
    if app.job.company_id != current_user.company.id:
        raise HTTPException(status_code=403, detail="Not your job posting")
    app.status = payload.status
    db.commit()
    db.refresh(app)
    return app
