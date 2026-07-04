from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
)
from app.dependencies.roles import require_role

from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database import get_db

from app.models.application import Application
from app.models.job import Job
from app.models.user import User
from app.models.company import Company
from app.schemas.application import ApplicationStatusUpdate, ApplicationApplicantResponse, MyApplicationResponse

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
            Application.user_id == current_user.id,
            Application.is_deleted == False
        )
        .first()
    )

    if existing_application:
        if existing_application.status == "withdrawn":
            existing_application.status = "pending"
            existing_application.applied_at = func.now()

            db.commit()
            db.refresh(existing_application)

            return{
                "message":"Application submitted successfully"
            }
        
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

@router.get("/me", response_model=list[MyApplicationResponse])
def my_applications(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    )
):

    applications = (
        db.query(Application)
        .filter(
            Application.user_id == current_user.id,
            Application.is_deleted == False
        )
        .all()
    )

    return applications



@router.get("/")
def get_all_applications(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_role("recruiter")
    )
):
    applications = (
        db.query(Application)
        .join(Job)
        .join(Company)
        .filter(
            Company.owner_id == current_user.id
        )
        .all()
    )

    return applications


# Recruiter View Application
@router.get("/job/{job_id}",response_model=list[ApplicationApplicantResponse])
def job_applications(
    job_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_role("recruiter")
    )
):
    
    job = (db.query(Job).filter(Job.id == job_id).first())

    if not job:
        raise HTTPException(status_code=404,detail="Job not found")
    
    if job.company.owner_id != current_user.id:
        raise HTTPException(status_code=403,detail="Access denied")

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
    
    if not current_user:
        raise HTTPException(status_code=403, detail="Access Denied")
    
     # Prevent updating withdrawn applications
    if application.status == "withdrawn":
        raise HTTPException(
            status_code=400,
            detail="Cannot update a withdrawn application"
        )


    application.status = data.status

    db.commit()
    db.refresh(application)

    return application



@router.patch("/{application_id}/withdraw")
def withdraw_application(
    application_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    application = (
        db.query(Application)
        .filter(Application.id == application_id)
        .first()
    )

    if not application:
        raise HTTPException(
            status_code=404,
            detail="Application not found"
        )

    # User can withdraw only their own application
    if application.user_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="You can only withdraw your own application"
        )

    # Already withdrawn
    if application.status == "withdrawn":
        raise HTTPException(
            status_code=400,
            detail="Application already withdrawn"
        )

    # Update status instead of deleting
    application.status = "withdrawn"

    db.commit()
    db.refresh(application)

    return {
        "message": "Application withdrawn successfully",
        "application_id": application.id,
        "status": application.status
    }


@router.patch("/{application_id}/delete")
def delete_application(
    application_id:int ,
    db:Session=Depends(get_db),
    current_user:User=Depends(get_current_user)
    ):
    application=(db.query(Application).filter(Application.id == application_id).first())
    if not application:
        raise HTTPException(status_code=404,detail="Application not found")
    
    if application.user_id != current_user.id:
        raise HTTPException(status_code=403,detail="Access denied")
    
    application.is_deleted = True
    db.commit()

    return{"message":"Application removed successfully"}