from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey,
    DateTime
)

from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database import Base


class Application(Base):
    __tablename__ = "applications"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    job_id = Column(
        Integer,
        ForeignKey("jobs.id"),
        nullable=False
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    status = Column(
        String,
        default="pending"
    )

    applied_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    job = relationship(
        "Job",
        back_populates="applications"
    )

    user = relationship(
        "User",
        back_populates="applications"
    )