from pydantic import BaseSettings


class Settings(BaseSettings):
    PROJECT_NAME = 'Binmart'
    SQLALCHEMY_DATABASE_URL = 'sqlite:///../app.db'

    QIWI_API_URL = 'https://edge.qiwi.com'
    QIWI_WALLET = '79650034551'
    QIWI_TOKEN = '132665789c9532eab8c1160a235e30e0'

    # Authjwt
    authjwt_secret_key: str = 'secret'
    authjwt_token_location: set = {'cookies'}
    authjwt_cookie_csrf_protect: bool = False
    authjwt_cookie_max_age: int = 86400
    authjwt_cookie_samesite: str = 'none'
    authjwt_cookie_secure: bool = True


settings = Settings()
