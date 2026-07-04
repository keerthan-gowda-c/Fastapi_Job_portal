from pydantic import BaseModel
from app.schemas.job import JobResponse

class SavedJobResponse(BaseModel):
    id:int
    job:JobResponse

    class Config:
        from_attributes = True