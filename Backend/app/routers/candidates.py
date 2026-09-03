from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
import cloudinary.uploader
import os

from app.database import get_db
from app.dependencies.auth import get_current_user
from app.models.user import User
from app.models.candidate import Candidate, Education, Experience, Project
from app.schemas.candidate import (
    CandidateResponse, CandidateUpdate,
    ProjectCreate, EducationCreate, ExperienceCreate,
    ProjectResponse, EducationResponse, ExperienceResponse,
    ProjectUpdate, EducationUpdate, ExperienceUpdate
)

router = APIRouter(prefix="/candidates", tags=["Candidates"])


def get_candidate(current_user: User, db: Session):
    candidate = db.query(Candidate).filter(Candidate.user_id == current_user.id).first()

    if not candidate:
        raise HTTPException(status_code=404, detail="Candidate profile not found")

    return candidate


@router.get("/{candidate_id}", response_model=CandidateResponse)
def get_candidate_profile(candidate_id: int, db: Session = Depends(get_db)):
    candidate = db.query(Candidate).filter(Candidate.id == candidate_id).first()

    if not candidate:
        raise HTTPException(status_code=404, detail="Candidate profile not found")

    return candidate


@router.get("/me", response_model=CandidateResponse)
def get_my_profile(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return get_candidate(current_user, db)


@router.put("/me", response_model=CandidateResponse)
def update_my_profile(data: CandidateUpdate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    candidate = get_candidate(current_user, db)

    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(candidate, field, value)

    db.commit()
    db.refresh(candidate)

    return candidate


@router.post("/me/resume")
async def upload_resume(file: UploadFile = File(...), current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    candidate = get_candidate(current_user, db)

    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")

    contents = await file.read()

    if len(contents) > 5 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="File size must be less than 5 MB")

    filename = os.path.splitext(file.filename)[0]

    result = cloudinary.uploader.upload(
        contents,
        resource_type="raw",
        format="pdf",
        folder="jobportal/resumes",
        public_id=f"{current_user.id}_{filename}",
        overwrite=True
    )

    candidate.resume_url = result["secure_url"]
    db.commit()
    db.refresh(candidate)

    return {"message": "Resume uploaded successfully", "resume_url": result["secure_url"]}


@router.post("/me/education", response_model=EducationResponse)
def create_education(data: EducationCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    candidate = get_candidate(current_user, db)
    education = Education(candidate_id=candidate.id, **data.model_dump())

    db.add(education)
    db.commit()
    db.refresh(education)

    return education


@router.get("/me/education", response_model=list[EducationResponse])
def get_my_education(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    candidate = get_candidate(current_user, db)
    return db.query(Education).filter(Education.candidate_id == candidate.id).all()


@router.put("/me/education/{education_id}", response_model=EducationResponse)
def update_education(education_id: int, data: EducationUpdate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    candidate = get_candidate(current_user, db)
    education = db.query(Education).filter(Education.id == education_id, Education.candidate_id == candidate.id).first()

    if not education:
        raise HTTPException(status_code=404, detail="Education not found")

    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(education, field, value)

    db.commit()
    db.refresh(education)

    return education


@router.delete("/me/education/{education_id}")
def delete_education(education_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    candidate = get_candidate(current_user, db)
    education = db.query(Education).filter(Education.id == education_id, Education.candidate_id == candidate.id).first()

    if not education:
        raise HTTPException(status_code=404, detail="Education not found")

    db.delete(education)
    db.commit()

    return {"message": "Education deleted successfully"}


@router.post("/me/experience", response_model=ExperienceResponse)
def create_experience(data: ExperienceCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    candidate = get_candidate(current_user, db)
    experience = Experience(candidate_id=candidate.id, **data.model_dump())

    db.add(experience)
    db.commit()
    db.refresh(experience)

    return experience


@router.get("/me/experience", response_model=list[ExperienceResponse])
def get_my_experience(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    candidate = get_candidate(current_user, db)
    return db.query(Experience).filter(Experience.candidate_id == candidate.id).all()


@router.put("/me/experience/{experience_id}", response_model=ExperienceResponse)
def update_experience(experience_id: int, data: ExperienceUpdate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    candidate = get_candidate(current_user, db)
    experience = db.query(Experience).filter(Experience.id == experience_id, Experience.candidate_id == candidate.id).first()

    if not experience:
        raise HTTPException(status_code=404, detail="Experience not found")

    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(experience, field, value)

    db.commit()
    db.refresh(experience)

    return experience


@router.delete("/me/experience/{experience_id}")
def delete_experience(experience_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    candidate = get_candidate(current_user, db)
    experience = db.query(Experience).filter(Experience.id == experience_id, Experience.candidate_id == candidate.id).first()

    if not experience:
        raise HTTPException(status_code=404, detail="Experience not found")

    db.delete(experience)
    db.commit()

    return {"message": "Experience deleted successfully"}


@router.post("/me/projects", response_model=ProjectResponse)
def create_project(data: ProjectCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    candidate = get_candidate(current_user, db)
    project = Project(candidate_id=candidate.id, **data.model_dump())

    db.add(project)
    db.commit()
    db.refresh(project)

    return project


@router.get("/me/projects", response_model=list[ProjectResponse])
def get_my_projects(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    candidate = get_candidate(current_user, db)
    return db.query(Project).filter(Project.candidate_id == candidate.id).all()


@router.put("/me/projects/{project_id}", response_model=ProjectResponse)
def update_project(project_id: int, data: ProjectUpdate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    candidate = get_candidate(current_user, db)
    project = db.query(Project).filter(Project.id == project_id, Project.candidate_id == candidate.id).first()

    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(project, field, value)

    db.commit()
    db.refresh(project)

    return project


@router.delete("/me/projects/{project_id}")
def delete_project(project_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    candidate = get_candidate(current_user, db)
    project = db.query(Project).filter(Project.id == project_id, Project.candidate_id == candidate.id).first()

    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    db.delete(project)
    db.commit()

    return {"message": "Project deleted successfully"}