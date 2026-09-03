from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies.auth import get_current_user
from app.models.user import User
from app.models.recruiter import Recruiter
from app.schemas.recruiter import (
    RecruiterResponse,
    RecruiterUpdate
)


router = APIRouter(
    prefix="/recruiters",
    tags=["Recruiters"]
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


@router.get("/me", response_model=RecruiterResponse)
def get_my_profile(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return get_recruiter(current_user, db)


@router.put("/me", response_model=RecruiterResponse)
def update_my_profile(
    data: RecruiterUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    recruiter = get_recruiter(current_user, db)

    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(recruiter, field, value)

    db.commit()
    db.refresh(recruiter)

    return recruiter

