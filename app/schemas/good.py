from pydantic import BaseModel


class GoodBase(BaseModel):
    name: str
    price: int
    data: str


class GoodCreate(GoodBase):
    author_id: int
    tags: list


class Good(GoodBase):
    id: int

    class Config:
        orm_mode = True
