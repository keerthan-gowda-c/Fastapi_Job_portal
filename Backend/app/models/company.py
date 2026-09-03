from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func


from app.database import Base


class Company(Base):
    __tablename__ = "companies"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    website = Column(String, nullable=True)
    location = Column(String, nullable=True)
    recruiter_id = Column(Integer, ForeignKey("recruiters.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    recruiter = relationship("Recruiter", back_populates="companies")
    jobs = relationship("Job", back_populates="company")