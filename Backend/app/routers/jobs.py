from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.job import Job
from app.models.user import User

from app.schemas.job import (
    JobCreate,
    JobResponse
)

from app.dependencies.roles import require_role

router = APIRouter(
    prefix="/jobs",
    tags=["Jobs"]
)


@router.post(
    "/",
    response_model=JobResponse
)
def create_job(
    job: JobCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_role("recruiter")
    )
):

    db_job = Job(**job.model_dump())

    db.add(db_job)
    db.commit()
    db.refresh(db_job)

    return db_job