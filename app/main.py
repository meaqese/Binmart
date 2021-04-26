import uvicorn
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi_jwt_auth import AuthJWT
from fastapi_jwt_auth.exceptions import AuthJWTException
from app.core import settings
from app.api import v1


app = FastAPI(title=settings.PROJECT_NAME)
app.include_router(v1.api_router)


@app.exception_handler(AuthJWTException)
def authjwt_exception_handler(request: Request, exc: AuthJWTException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.message}
    )


@AuthJWT.load_config
def get_config():
    return settings


if __name__ == '__main__':
    uvicorn.run('main:app', reload=True)
