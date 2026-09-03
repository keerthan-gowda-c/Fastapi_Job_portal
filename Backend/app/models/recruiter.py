from sqlalchemy import Column, Integer, Text, ForeignKey, String
from sqlalchemy.orm import relationship

from app.database import Base

class Recruiter(Base):
    __tablename__="recruiters"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"),unique=True, nullable=False)
    designation = Column(String, nullable=True)
    bio = Column(Text, nullable=True)

    # Relationships
    user = relationship("User",back_populates="recruiter")
    companies = relationship("Company",back_populates="recruiter")