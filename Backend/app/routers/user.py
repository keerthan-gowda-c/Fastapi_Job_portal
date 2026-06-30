from fastapi import APIRouter, Depends, UploadFile, File, HTTPException, Form
import os
import shutil
from app.dependencies.auth import get_current_user
from app.models.user import User
from app.database import get_db
from sqlalchemy.orm import Session
from app.schemas.user import UserUpdate

import os 

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


@router.get("/me")
def get_me(
    current_user: User = Depends(get_current_user)
):
    return {
        "id": current_user.id,
        "full_name": current_user.full_name,
        "email": current_user.email,
        "role": current_user.role,
        "is_active": current_user.is_active,
        "phone": current_user.phone,
        "location": current_user.location,
        "skills": current_user.skills,
        "experience": current_user.experience,
        "education": current_user.education,
        "resume_url": current_user.resume_url,
        "profile_image": current_user.profile_image,
    }


@router.post("/resume")
async def upload_resume(
    file:UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
    ):

    allowed_types = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ]

    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail="Only PDF and DOCX files are allowed"
        )
    os.makedirs("uploads/resumes", exist_ok=True)

    file_path = f"uploads/resumes/{current_user.id}_{file.filename}"

    contents = await file.read()

    if len(contents) > 5 * 1024 * 1024:
        raise HTTPException(
            status_code=400,
            detail="File size must be less than 5 MB"
        )

    with open(file_path, "wb") as buffer:
        buffer.write(contents)

    current_user.resume_url = file_path
    db.commit()
    db.refresh(current_user)

    return{
        "message" : "Resume uploaded",
        "resume_url" : file_path
    }

@router.delete("/delete-all-users")
def delete_all_users(
    db: Session = Depends(get_db)
):

    db.query(User).delete()

    db.commit()

    return {
        "message": "All users deleted"
    }


@router.put("/me")
def update_profile(
    full_name: str = Form(...),
    phone: str = Form(None),
    location: str = Form(None),
    skills: str = Form(None),
    experience: str = Form(None),
    education: str = Form(None),
    resume: UploadFile = File(None),
    profile_image: UploadFile = File(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    current_user.full_name = full_name
    current_user.phone = phone
    current_user.location = location
    current_user.skills = skills
    current_user.experience = experience
    current_user.education = education

    if resume:
        resume_path = f"uploads/resumes/{resume.filename}"

        with open(resume_path, "wb") as buffer:
            shutil.copyfileobj(resume.file, buffer)

        current_user.resume_url = "/" + resume_path

    if profile_image:
        image_path = f"uploads/profile_images/{profile_image.filename}"

        with open(image_path, "wb") as buffer:
            shutil.copyfileobj(profile_image.file, buffer)

        current_user.profile_image = "/" + image_path

    db.commit()
    db.refresh(current_user)

    return current_user


@router.post("/profile-image")
async def upload_profile_image(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):

    allowed_types = [
        "image/jpeg",
        "image/png",
        "image/jpg"
    ]

    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail="Only JPG, JPEG and PNG images are allowed"
        )

    os.makedirs("uploads/profile_images", exist_ok=True)

    file_path = f"uploads/profile_images/{current_user.id}_{file.filename}"

    contents = await file.read()

    if len(contents) > 2 * 1024 * 1024:
        raise HTTPException(
            status_code=400,
            detail="Image size must be less than 2 MB"
        )

    with open(file_path, "wb") as buffer:
        buffer.write(contents)

    current_user.profile_image = file_path

    db.commit()
    db.refresh(current_user)

    return {
        "message": "Profile image uploaded successfully",
        "profile_image": file_path
    }