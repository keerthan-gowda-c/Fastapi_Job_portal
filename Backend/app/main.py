from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware


from app.models.user import User
from app.models.company import Company
from app.models.job import Job
from app.models.application import Application
from app.models.saved_jobs import SavedJob



app = FastAPI(
    title="Job Portal API"
)


# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change later when frontend is deployed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


from app.routers.auth import router as auth_router
from app.routers.user import router as user_router
from app.routers.companies import router as company_router
from app.routers.jobs import router as job_router
from app.routers.applications import router as application_router
from app.routers.dashboard import router as dashboard_router
from app.routers.saved_jobs import router as saved_job_router


app.include_router(auth_router)
app.include_router(user_router)
app.include_router(company_router)
app.include_router(job_router)
app.include_router(application_router)
app.include_router(dashboard_router)
app.include_router(saved_job_router)


app.mount("/uploads",StaticFiles(directory="uploads"),name="uploads")