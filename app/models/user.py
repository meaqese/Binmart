from sqlalchemy import Column, String, Integer, Boolean
from sqlalchemy.orm import relationship
from app.database import Base


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String)
    password = Column(String)
    balance = Column(Integer, default=0)
    is_admin = Column(Boolean, default=False)

    goods = relationship('Good', backref='author')
