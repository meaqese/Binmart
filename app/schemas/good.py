from pydantic import BaseModel


class GoodBase(BaseModel):
    name: str
    price: int
    data: str
    tags: list


class GoodCreate(GoodBase):
    author_id: int


class Good(GoodBase):
    id: int

    class Config:
        orm_mode = True
