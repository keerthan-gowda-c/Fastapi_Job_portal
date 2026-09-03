from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional

from app.database import get_db
from app.models.company import Company
from app.models.recruiter import Recruiter
from app.models.user import User


from app.schemas.company import (
    CompanyCreate,
    CompanyResponse, CompanyUpdate
)

from app.dependencies.roles import require_role

router = APIRouter(
    prefix="/companies",
    tags=["Companies"]
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

@router.post("/",response_model=CompanyResponse)
def create_company(
    company: CompanyCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_role("recruiter")
    )
):
    recruiter = get_recruiter(current_user, db)

    new_company = Company(
        name=company.name,
        description=company.description,
        website=company.website,
        location=company.location,
        recruiter_id=recruiter.id
    )

    db.add(new_company)
    db.commit()
    db.refresh(new_company)

    return new_company


@router.get("/")
def list_companies(search:Optional[str]=None,
                   page:int = 1, limit:int=10,
                   db:Session = Depends(get_db)):

    query=db.query(Company)
    if search:
        query = query.filter(Company.name.ilike(f"%{search}%"))

    companies = query.order_by(Company.name).offset((page - 1)*limit).limit(limit).all()
    return companies



@router.get("/me",response_model=CompanyResponse)
def get_my_company(db:Session=Depends(get_db),current_user:User=Depends(require_role("recruiter"))):

    recruiter = get_recruiter(current_user, db)
    company = (
        db.query(Company)
        .filter(Company.recruiter_id == recruiter.id)
        .first()
    )
    if not company:
        raise HTTPException(
            status_code=404,
            detail="Company not found"
        )
    return company



@router.get("/{company_id}", response_model=CompanyResponse)
def get_company(company_id:int, db:Session=Depends(get_db)):
    company = (db.query(Company).filter(Company.id == company_id).first())

    if not company:
        raise HTTPException(status_code=404,detail = "Company not found")
    
    return company



@router.put("/{company_id}",response_model=CompanyResponse)
def update_company(
    company_id:int,
    company_data:CompanyUpdate,
    db: Session=Depends(get_db),
    current_user: User = Depends(require_role("recruiter"))
):
    recruiter = get_recruiter(current_user, db)
    company = (db.query(Company).filter(Company.id == company_id,Company.recruiter_id==recruiter.id).first())

    if not company:
        raise HTTPException(status_code=404,detail="Company not found")
    
    if company.recruiter_id != recruiter.id:
        raise HTTPException(status_code=403, detail="Access denied")
    
    for field, value in company_data.model_dump(exclude_unset=True).items():
        setattr(company, field, value)

    db.commit()
    db.refresh(company)

    return company


@router.patch("/me",response_model=CompanyResponse)
def update_my_company(data:CompanyUpdate, db:Session = Depends(get_db), current_user : User = Depends(require_role("recruiter"))):
    recruiter = get_recruiter(current_user, db)
    company = (db.query(Company).filter(Company.recruiter_id == recruiter.id).first())

    if not company:
        raise HTTPException(status_code=404, detail="Company not found")
    
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(company,field, value)

    db.commit()
    db.refresh(company)

    return company

@router.delete("/{company_id}")
def delete_company(
    company_id:int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role("recruiter"))
):

    recruiter = get_recruiter(current_user, db)
    company = (db.query(Company).filter(Company.id == company_id,Company.recruiter_id==recruiter.id).first())
    
    if not company:
        raise HTTPException(status_code=404,detail="Company not found")
    
    if company.recruiter_id != current_user.id:
        raise HTTPException(status_code=403, detail="Access Denied")
    
    db.delete(company)
    db.commit()

    return {"message":"Company deleted successfully"}