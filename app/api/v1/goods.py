from fastapi import APIRouter, Depends, Query, Response
from typing import Optional, List
from json import loads
from sqlalchemy.orm import Session
from fastapi_jwt_auth import AuthJWT
from app import crud
from app.api.deps import get_db
from app import schemas

router = APIRouter()


def good_to_dict(good):
    return {
        'id': good.id, 'author_id': good.author_id, 'name': good.name, 'price': good.price,
        'tags': good.tags
    }


@router.get('/goods')
def goods(tags: Optional[List] = Query(None), db: Session = Depends(get_db)):
    goods_in_db = crud.get_goods(db, tags)

    return [good_to_dict(good) for good in goods_in_db]


@router.get('/my-goods')
def my_goods(db: Session = Depends(get_db), authorize: AuthJWT = Depends()):
    authorize.jwt_required()

    user = loads(authorize.get_jwt_subject())
    goods_in_db = crud.get_user(db, user['username']).goods

    return [good_to_dict(good) for good in goods_in_db]


@router.get('/tags')
def get_tags(db: Session = Depends(get_db)):
    return crud.get_tags(db)


@router.post('/good')
def create_new_good(
    good: schemas.GoodBase,
    db: Session = Depends(get_db),
    authorize: AuthJWT = Depends()
):
    authorize.jwt_required()

    user_data = loads(authorize.get_jwt_subject())
    author_id = user_data['id']

    new_good = schemas.GoodCreate(author_id=author_id, name=good.name, price=good.price,
                                  data=good.data, tags=good.tags)
    created = crud.create_good(db, new_good)

    response = new_good.dict().copy()
    response['id'] = created.id
    response['tags'] = created.tags
    del response['data']

    return response


@router.post('/buy/{good_id}')
def buy(good_id: int, response: Response,
        db: Session = Depends(get_db), authorize: AuthJWT = Depends()):
    authorize.jwt_required()

    user = loads(authorize.get_jwt_subject())

    user_in_db = crud.get_user(db, user['username'])
    good = crud.get_good_by_id(db, good_id)

    if good and user_in_db.balance >= good.price:
        buying = crud.change_balance(db, user_in_db.username, user_in_db.balance - good.price)
        crud.top_balance(db, good.author.username, good.price)
        if buying:
            crud.delete_good(db, good.id)
            return {'data': good.data}
    response.status_code = 400
    return {'success': False, 'reason': 'Good price is more than balance'}


@router.delete('/good/{good_id}')
def delete_good(good_id: int, db: Session = Depends(get_db), authorize: AuthJWT = Depends()):
    authorize.jwt_required()

    user = loads(authorize.get_jwt_subject())

    user_in_db = crud.get_user(db, user['username'])
    good = crud.get_good_by_id(db, good_id)

    if good.author_id == user_in_db.id:
        deleted = crud.delete_good(db, good_id)
        return good_to_dict(deleted)
    return {'success': False, 'reason': 'Haven\'t permissions for delete this good'}
