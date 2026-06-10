from sqlalchemy.orm import Session

from app.models.user import User
from app.core.security import hash_password


def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()


def create_user(db: Session, user):
    hashed_pwd = hash_password(user.password)

    db_user = User(
        full_name=user.full_name,
        email=user.email,
        hashed_password=hashed_pwd
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user