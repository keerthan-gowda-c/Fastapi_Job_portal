from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db

from app.models.user import User
from app.models.company import Company
from app.models.job import Job
from app.models.application import Application

from app.dependencies.roles import require_role

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/recruiter")
def recruiter_dashboard(
    db:Session=Depends(get_db),
    current_user: User = Depends(require_role("recruiter"))
):
    companies = (db.query(Company).filter(Company.owner_id == current_user.id).all())
    company_ids = [company.id for company in companies]
    jobs = (db.query(Job).filter(Job.company_id.in_(company_ids)).all())
    job_ids = [job.id for job in jobs]
    applications = (db.query(Application).filter(Application.job_id.in_(job_ids)).all())

    return{
        "companies":len(companies),
        "jobs":len(jobs),
        "applications":len(applications)
    }