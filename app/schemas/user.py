from pydantic import BaseModel


class UserBase(BaseModel):
    username: str
    password: str


class User(BaseModel):
    id: int
    is_admin: int
    balance: int

    class Config:
        orm_mode = True
