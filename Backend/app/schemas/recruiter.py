from pydantic import BaseModel

class RecruiterCreate(BaseModel):
    user_id : int 
    designation : str | None = None
    bio : str | None = None

class RecruiterResponse(BaseModel):
    id: int 
    user_id : int 
    designation : str | None = None
    bio : str | None = None

    class Config: 
        from_attributes = True

class RecruiterUpdate(BaseModel):
    designation: str | None = None
    bio: str | None = None