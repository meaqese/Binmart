from sqlalchemy.orm import Session
from app.models.good import Good
from app.models.tag import Tag
from app import schemas


def get_goods(db: Session, tags: list = None):
    if tags:
        tags_filtered = db.query(Tag).filter(Tag.name.in_(tags)).all()

        goods_filtered = []
        for tag in tags_filtered:
            goods_filtered.extend(tag.goods)

        return set(goods_filtered)
    return db.query(Good).all()


def get_tags(db: Session):
    return db.query(Tag).all()


def get_good_by_id(db: Session, good_id: int):
    return db.query(Good).filter_by(id=good_id).first()


def create_good(db: Session, good: schemas.GoodCreate):
    new_good = Good(author_id=good.author_id, name=good.name, price=good.price, data=good.data)
    for tag in good.tags:
        tag_in_db = db.query(Tag).filter_by(name=tag).first()

        if tag_in_db:
            new_good.tags.append(tag_in_db)

    db.add(new_good)
    db.commit()

    return new_good


def delete_good(db: Session, good_id: int):
    good_in_db = db.query(Good).filter_by(id=good_id).first()
    db.delete(good_in_db)
    db.commit()

    return good_in_db




