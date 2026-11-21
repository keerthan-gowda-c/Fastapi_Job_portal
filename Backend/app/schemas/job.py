from pydantic import BaseModel
from app.enums.employment import EmploymentType
from datetime import datetime
class JobCreate(BaseModel):
    title: str
    description: str
    location: str
    salary: str
    employment_type : EmploymentType
    

class JobResponse(BaseModel):
    id: int
    title: str
    description: str
    location: str
    salary: str
    employment_type : EmploymentType
    created_at: datetime

    class Config:
        from_attributes = True

class CompanyBasicResponse(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True


class RecruiterBasicResponse(BaseModel):
    full_name: str

    class Config:
        from_attributes = True


class JobDetailResponse(BaseModel):
    id: int
    title: str
    description: str
    location: str
    salary: str
    employment_type: EmploymentType
    company: CompanyBasicResponse
    recruiter: RecruiterBasicResponse

    class Config:
        from_attributes = True