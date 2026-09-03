from pydantic import BaseModel


class CompanyCreate(BaseModel):
    name: str
    description: str
    website: str
    location: str


class CompanyResponse(BaseModel):
    id: int
    name: str
    description: str
    website: str
    location: str
    recruiter_id: int

    class Config:
        from_attributes = True


class CompanyUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    website: str | None = None
    location: str | None = None
    