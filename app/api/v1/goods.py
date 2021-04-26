from fastapi import APIRouter, Depends, Form, Response
from json import loads
from sqlalchemy.orm import Session
from fastapi_jwt_auth import AuthJWT
from app import crud
from app.api.deps import get_db
from app import schemas

router = APIRouter()


@router.get('/goods')
def goods(db: Session = Depends(get_db)):
    return [
        {column.name: getattr(good, column.name) for column in good.__table__.columns}
        for good in crud.get_goods(db)
    ]


@router.post('/good')
def create_new_good(db: Session = Depends(get_db), name: str = Form(...), price: str = Form(...),
                    data: str = Form(...), tags: list = Form(...), authorize: AuthJWT = Depends()):
    authorize.jwt_required()

    user_data = loads(authorize.get_jwt_subject())
    author_id = user_data['id']

    new_good = schemas.GoodCreate(author_id=author_id, name=name, price=price, data=data, tags=tags)
    created = crud.create_good(db, new_good)

    response = new_good.dict().copy()
    response['id'] = created.id

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
        if buying:
            crud.delete_good(db, good.id)
            return {'data': good.data}
    response.status_code = 400
    return {'success': False, 'reason': 'Good price is more than balance'}


@router.delete('/good')
def delete_good(good_id: int, db: Session = Depends(get_db)):
    return crud.delete_good(db, good_id)


