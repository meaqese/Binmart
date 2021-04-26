from sqlalchemy.orm import Session
from app.models.user import User
from app import schemas


def get_user(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()


def create_user(db: Session, user: schemas.user.UserBase):
    new_user = User(username=user.username, password=user.password)
    db.add(new_user)
    db.commit()

    return new_user


def change_balance(db: Session, username: str, balance: int):
    user_in_db = db.query(User).filter_by(username=username).first()

    try:
        user_in_db.balance = balance
        db.commit()

        return True
    except Exception:
        db.rollback()
    return False
