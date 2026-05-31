from fastapi import FastAPI
from app.core.config import settings
from app.database import Base, engine
from app.routers import auth, users, companies, jobs, applications

# Import all models so SQLAlchemy knows about them before create_all
from app.models import user, company, job, application  # noqa: F401

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.APP_NAME,
    version="1.0.0",
    description="A full-featured job portal REST API",
)

app.include_router(auth.router)
app.include_router(users.router)
app.include_router(companies.router)
app.include_router(jobs.router)
app.include_router(applications.router)


@app.get("/", tags=["Health"])
def health():
    return {"status": "ok", "app": settings.APP_NAME}
