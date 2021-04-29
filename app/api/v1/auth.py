import json

from fastapi import APIRouter, Depends, Form, Response
from sqlalchemy.orm import Session

from passlib.context import CryptContext
from fastapi_jwt_auth import AuthJWT


from app.api.deps import get_db
from app.crud import get_user, create_user
from app import schemas

router = APIRouter()

pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')


def verify_password(password, hashed_password) -> bool:
    return pwd_context.verify(password, hashed_password)


def get_hash(password) -> str:
    return pwd_context.hash(password)


@router.post('/login')
def login(
    response: Response, data: schemas.UserBase,
    db: Session = Depends(get_db),
    authorize: AuthJWT = Depends()
):
    user = get_user(db, data.username)
    if user and verify_password(data.password, user.password):
        key = authorize.create_access_token(json.dumps({
            'id': user.id,
            'username': user.username,
            'balance': user.balance
        }))
        authorize.set_access_cookies(key)
        return {'id': user.id, 'username': user.username, 'balance': user.balance}
    response.status_code = 400
    return {'success': 'False'}


@router.get('/login')
def check_login(response: Response, authorize: AuthJWT = Depends(), db: Session = Depends(get_db)):
    authorize.jwt_required()

    if jwt_data := authorize.get_jwt_subject():
        user_jwt_data = json.loads(jwt_data)
        user = get_user(db, user_jwt_data['username'])

        return {'id': user.id, 'username': user.username, 'balance': user.balance}
    response.status_code = 401
    return {'success': False}


@router.post('/register')
def register(
    response: Response,
    user: schemas.UserBase,
    db: Session = Depends(get_db),
    authorize: AuthJWT = Depends()
):
    user_in_db = get_user(db, user.username)
    if not user_in_db:
        hashed_password = get_hash(user.password)
        created = create_user(db, schemas.UserBase(username=user.username, password=hashed_password))

        user_data = {
            'id': created.id,
            'username': created.username,
            'balance': created.balance
        }

        key = authorize.create_access_token(json.dumps(user_data))
        authorize.set_access_cookies(key)

        return user_data
    response.status_code = 401
    return {'success': False, 'reason': 'User already has been registered'}


@router.get('/logout')
def logout(response: Response, authorize: AuthJWT = Depends()):
    authorize.jwt_required()

    response.set_cookie('access_token_cookie', '', secure=True, samesite='none')

    return {'success': True}

