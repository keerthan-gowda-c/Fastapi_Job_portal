from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.company import Company
from app.models.user import User

from app.schemas.company import (
    CompanyCreate,
    CompanyResponse
)

from app.dependencies.roles import require_role

router = APIRouter(
    prefix="/companies",
    tags=["Companies"]
)


@router.post(
    "/",
    response_model=CompanyResponse
)
def create_company(
    company: CompanyCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_role("recruiter")
    )
):

    new_company = Company(
        name=company.name,
        description=company.description,
        website=company.website,
        location=company.location,
        owner_id=current_user.id
    )

    db.add(new_company)
    db.commit()
    db.refresh(new_company)

    return new_company