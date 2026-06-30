from pydantic import BaseModel


class JobCreate(BaseModel):
    title: str
    description: str
    location: str
    salary: int


class JobResponse(BaseModel):
    id: int
    title: str
    description: str
    location: str
    salary: int

    class Config:
        from_attributes = True