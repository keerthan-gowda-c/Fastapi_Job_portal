from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db

from app.models.user import User
from app.models.company import Company
from app.models.job import Job
from app.models.application import Application
from app.models.recruiter import Recruiter

from app.dependencies.roles import require_role

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

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

@router.get("/recruiter")
def recruiter_dashboard(
    db:Session=Depends(get_db),
    current_user: User = Depends(require_role("recruiter"))
):
    recruiter = get_recruiter(current_user, db)
    companies = (db.query(Company).filter(Company.recruiter_id == recruiter.id).all())
    company_ids = [company.id for company in companies]
    jobs = (db.query(Job).filter(Job.company_id.in_(company_ids)).all())
    job_ids = [job.id for job in jobs]
    applications = (db.query(Application).filter(Application.job_id.in_(job_ids),Application.is_deleted == False).all())
    pending = len([a for a in applications if a.status == "pending"])
    reviewed = len([a for a in applications if a.status == "reviewed"])
    shortlisted = len([a for a in applications if a.status == "shortlisted"])
    rejected = len([a for a in applications if a.status == "rejected"])
    hired = len([a for a in applications if a.status == "hired"])
    withdrawn = len([a for a in applications if a.status == "withdrawn"])
    hire_rate = ((hired/len(applications))*100 if applications else 0)
    hire_percentage = float(f"{hire_rate:.2f}")


    return{
        "companies":len(companies),
        "jobs":len(jobs),
        "applications":len(applications),
        "pending": pending,
        "reviewed": reviewed,
        "shortlisted": shortlisted,
        "rejected": rejected,
        "hired": hired,
        "withdrawn": withdrawn,
        "hire_rate":hire_percentage,
    }



@router.get("/jobseeker")
def jobseeker_dashboard(
    db:Session=Depends(get_db),
    current_user:User = Depends(require_role("jobseeker"))):
    
    applications = (db.query(Application).filter(Application.user_id == current_user.id,Application.is_deleted == False).all())
    pending = len([a for a in applications if a.status == "pending"])
    reviewed = len([a for a in applications if a.status == "reviewed"])
    shortlisted = len([a for a in applications if a.status == "shortlisted"])
    rejected = len([a for a in applications if a.status == "rejected"])
    hired = len([a for a in applications if a.status == "hired"])
    withdrawn = len([a for a in applications if a.status == "withdrawn"])

    return {
        "total_applications":len(applications),
        "pending": pending,
        "reviewed": reviewed,
        "shortlisted": shortlisted,
        "rejected": rejected,
        "hired": hired,
        "withdrawn": withdrawn,
    }
    
    