from sqlalchemy import Column, Integer, ForeignKey, Text, String, Date, Boolean
from sqlalchemy.orm import relationship

from app.database import Base

class Candidate(Base):
    __tablename__ = "candidates"

    id = Column(Integer,primary_key=True, index=True)
    user_id = Column(Integer,ForeignKey("users.id"),unique=True,nullable=False)
    bio = Column(Text, nullable=True)
    resume_url = Column(Text, nullable=True)
    skills = Column(Text, nullable=True)

    # Relationships
    user = relationship("User", back_populates="candidate")
    educations = relationship("Education", back_populates="candidate",cascade="all, delete-orphan")
    experiences = relationship("Experience",back_populates="candidate",cascade="all, delete-orphan")
    projects = relationship("Project",back_populates="candidate",cascade="all, delete-orphan")


class Education(Base):
    __tablename__ = "educations"

    id = Column(Integer, primary_key=True, index=True)
    candidate_id = Column(Integer,ForeignKey("candidates.id", ondelete="CASCADE"),nullable=False)
    institution = Column(String, nullable=False)
    degree = Column(String, nullable=True)
    field_of_study = Column(String, nullable=True)
    start_year = Column(Date, nullable=True)
    end_year = Column(Date, nullable=True)
    grade = Column(String, nullable=True)
    description = Column(Text, nullable=True)

    # RelationShip
    candidate = relationship("Candidate",back_populates="educations")


class Experience(Base):
    __tablename__ = "experiences"

    id = Column(Integer, primary_key=True, index=True)
    candidate_id = Column(Integer,ForeignKey("candidates.id", ondelete="CASCADE"),nullable=False)
    job_title = Column(String, nullable=False)
    company_name = Column(String, nullable=False)
    employment_type = Column(String, nullable=True)
    location = Column(String, nullable=True)
    start_date = Column(Date, nullable=True)
    end_date = Column(Date, nullable=True)
    is_current = Column(Boolean,default=False)
    description = Column(Text, nullable=True)

    # Relationship
    candidate = relationship("Candidate",back_populates="experiences")


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    candidate_id = Column(Integer,ForeignKey("candidates.id", ondelete="CASCADE"),nullable=False)
    project_name = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    technologies = Column(Text, nullable=True)
    project_url = Column(String, nullable=True)
    github_url = Column(String, nullable=True)
    start_date = Column(Date, nullable=True)
    end_date = Column(Date, nullable=True)

    # Relationship
    candidate = relationship("Candidate",back_populates="projects")