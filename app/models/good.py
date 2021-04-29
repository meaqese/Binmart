from sqlalchemy import Column, String, Integer, Text, ForeignKey, Table
from sqlalchemy.orm import relationship
from app.database import Base


association_table = Table(
    'good_tag', Base.metadata,
    Column('good_id', Integer, ForeignKey('goods.id')),
    Column('tag_id', Integer, ForeignKey('tags.id'))
)


class Good(Base):
    __tablename__ = 'goods'

    id = Column(Integer, primary_key=True, autoincrement=True)
    author_id = Column(Integer, ForeignKey('users.id'))
    name = Column(String)
    price = Column(Integer)
    data = Column(Text)

    tags = relationship('Tag', secondary=association_table, backref='goods')
