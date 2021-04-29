from fastapi import APIRouter

from app.api.v1 import auth, goods, user

api_router = APIRouter()
api_router.include_router(auth.router)
api_router.include_router(goods.router)
api_router.include_router(user.router)
