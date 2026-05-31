from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate

def create_user(db: Session, user: UserCreate):
    db_user = User(
        full_name=user.full_name,
        email = user.email
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user

def get_user_by_email(db: Session, email:str):
    return db.query(User).filter(User.email == email).first()

def get_users(db:Session):
    return db.query(User).all()

