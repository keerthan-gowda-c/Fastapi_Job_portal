from pydantic import BaseModel, EmailStr
from datetime import datetime

class UserCreate(BaseModel):
    full_name: str
    email: EmailStr

class UserResponse(BaseModel):
    id: int
    full_name:str
    email:str
    role:str
    is_active:bool
    created_at:datetime

    class Config:
        from_attributes = True
