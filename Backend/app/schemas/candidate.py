from datetime import date
from pydantic import BaseModel, HttpUrl, Field

from app.enums.degree import  DegreeType
from app.enums.employment import EmploymentType

class EducationCreate(BaseModel):
    institution: str
    degree: DegreeType
    field_of_study: str | None = None
    start_year : date | None = None
    end_year : date | None = None
    grade : str | None = None
    description : str | None = None

class EducationResponse(EducationCreate):
    id:int 
    candidate_id: int 

    class Config:
        from_attributes = True

class EducationUpdate(BaseModel):
    institution: str | None = None
    degree: DegreeType | None = None
    field_of_study: str | None = None
    start_year : date | None = None
    end_year : date | None = None
    grade : str | None = None
    description : str | None = None

class ExperienceCreate(BaseModel):
    job_title: str 
    company_name : str 
    employment_type : EmploymentType
    location : str | None = None
    start_date : date | None = None
    end_date : date | None = None
    is_current : bool | None = None
    description : str | None = None

class ExperienceResponse(ExperienceCreate):
    id: int
    candidate_id : int

    class Config:
        from_attributes = True

class ExperienceUpdate(BaseModel):
    job_title: str | None = None
    company_name : str | None = None
    employment_type : EmploymentType
    location : str | None = None
    start_date : date | None = None
    end_date : date | None = None
    is_current : bool | None = None
    description : str | None = None


class ProjectCreate(BaseModel):
    project_name: str 
    description : str | None = None
    technologies : str | None = None
    project_url : str | None = None
    github_url : str | None = None
    start_date : date | None = None
    end_date : date | None = None

class ProjectResponse(ProjectCreate):
    id : int
    candidate_id : int

    class Config:
        from_attributes = True

class ProjectUpdate(BaseModel):
    project_name: str | None = None
    description : str | None = None
    technologies : str | None = None
    project_url : str | None = None
    github_url : str | None = None
    start_date : date | None = None
    end_date : date | None = None


class CandidateCreate(BaseModel):
    user_id : int 
    bio : str | None = None
    resume_url : str | None = None
    skills : str | None = None

class CandidateResponse(CandidateCreate):
    id : int 
    bio : str | None = None
    resume_url : str | None = None
    skills : str | None = None
    educations: list[EducationResponse] = Field(default_factory=list)
    experiences: list[ExperienceResponse] = Field(default_factory=list)
    projects: list[ProjectResponse] = Field(default_factory=list)
    class Config:
        from_attributes = True

class CandidateUpdate(BaseModel):
    bio : str | None = None
    resume_url : str | None = None
    skills : str | None = None