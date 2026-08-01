from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import cloudinary
import os

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
    allow_origins=["http://localhost:5173",
        "https://fastapi-job-portal-mauve.vercel.app",],  # Change later when frontend is deployed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
    secure=True,
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


