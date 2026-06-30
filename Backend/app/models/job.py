from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    ForeignKey,
    DateTime
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database import Base


class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String, nullable=False)

    description = Column(Text, nullable=False)

    location = Column(String)

    salary = Column(Integer)

    company_id = Column(
        Integer,
        ForeignKey("companies.id")
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    company = relationship(
        "Company",
        back_populates="jobs"
    )
    applications = relationship(
    "Application",
    back_populates="job",
    cascade="all, delete"
    )
    saved_by = relationship(
    "SavedJob",
    cascade="all, delete-orphan",
    back_populates="job"
)