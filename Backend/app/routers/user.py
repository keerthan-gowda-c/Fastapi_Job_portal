from fastapi import APIRouter, Depends, UploadFile, File, HTTPException

from app.dependencies.auth import get_current_user
from app.models.user import User
from app.database import get_db
from sqlalchemy.orm import Session

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
        "is_active": current_user.is_active
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
    os.makedirs("uploads", exist_ok=True)
    file_path = f"uploads/{current_user.id}_{file.filename}"

    contents = await file.read()

    if len(contents) > 5 * 1024 * 1024:
        raise HTTPException(
            status_code=400,
            detail="File size must be less than 5 MB"
        )

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    current_user.resume_url = file_path
    db.commit()
    db.refresh(current_user)

    return{
        "message" : "Resume uploaded",
        "resume_url" : file_path
    }