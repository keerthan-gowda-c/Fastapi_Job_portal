from fastapi import APIRouter, Depends, HTTPException
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


@router.get("/")
def get_companies(db: Session = Depends(get_db)):
    return db.query(Company).all()



@router.get("/{company_id}")
def get_company(company_id:int, db:Session=Depends(get_db)):
    company = (db.query(Company).filter(Company.id == company_id).first())

    if not company:
        raise HTTPException(status_code=404,detail = "Company not found")
    
    return company


@router.put("/{company_id}")
def update_company(
    company_id:int,
    company_data:CompanyCreate,
    db: Session=Depends(get_db),
    current_user: User = Depends(require_role("recruiter"))
):
    company = (db.query(Company).filter(Company.id == company_id).first())

    if not company:
        raise HTTPException(status_code=404,detail="Company not found")
    
    if company.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Access denied")
    
    company.name = company_data.name
    company.description = company_data.description
    company.website = company_data.website
    company.location = company_data.location

    db.commit()
    db.refresh(company)

    return company

@router.delete("/{company_id}")
def delete_company(
    company_id:int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role("recruiter"))
):
    company = (db.query(Company).filter(Company.id == company_id).first())
    
    if not company:
        raise HTTPException(status_code=404,detail="Company not found")
    
    if company.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Access Denied")
    
    db.delete(company)
    db.commit()

    return {"message":"Company deleted successfully"}