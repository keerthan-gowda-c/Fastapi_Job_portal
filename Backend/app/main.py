from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import cloudinary
from app.core.config import settings

from app.models import *



app = FastAPI(
    title=settings.APP_NAME
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.ALLOWED_ORIGIN],  # Change later when frontend is deployed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

cloudinary.config(
    cloud_name=settings.CLOUDINARY_CLOUD_NAME,
    api_key=settings.CLOUDINARY_API_KEY,
    api_secret=settings.CLOUDINARY_API_SECRET,
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
