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
    response: Response,
    username: str = Form(...),
    password: str = Form(...),
    db: Session = Depends(get_db),
    authorize: AuthJWT = Depends()
):
    user = get_user(db, username)
    if user and verify_password(password, user.password):
        key = authorize.create_access_token(json.dumps({
            'id': user.id,
            'username': user.username,
            'balance': user.balance
        }))
        authorize.set_access_cookies(key)
        return {'id': user.id, 'username': user.username, 'balance': user.balance}
    response.status_code = 401
    return {'success': 'False'}


@router.get('/login')
def check_login(response: Response, authorize: AuthJWT = Depends()):
    authorize.jwt_required()

    if jwt_data := authorize.get_jwt_subject():
        return json.loads(jwt_data)
    response.status_code = 401
    return {'success': False}


@router.post('/register')
def register(
    response: Response,
    username: str = Form(...),
    password: str = Form(...),
    db: Session = Depends(get_db)
):
    user = get_user(db, username)
    if not user:
        password = get_hash(password)
        create_user(db, schemas.UserBase(username=username, password=password))

        return {'success': 'True'}
    response.status_code = 401
    return {'success': False, 'reason': 'User already has been registered'}


@router.get('/logout')
def logout(authorize: AuthJWT = Depends()):
    authorize.jwt_required()

    authorize.unset_jwt_cookies()

    return {'success': True}

