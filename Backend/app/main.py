from fastapi import FastAPI

from app.database import Base, engine
from app.routers.auth import router as auth_router
from app.models.user import User
from app.models.company import Company

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Job Portal API"
)

app.include_router(auth_router)


from app.routers.auth import router as auth_router
from app.routers.user import router as user_router
from app.routers.companies import router as company_router
from app.routers.jobs import router as job_router
from app.routers.applications import router as application_router


app.include_router(auth_router)
app.include_router(user_router)
app.include_router(company_router)
app.include_router(job_router)
app.include_router(application_router)