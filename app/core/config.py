from pydantic import BaseSettings


class Settings(BaseSettings):
    PROJECT_NAME = 'Binmart'
    SQLALCHEMY_DATABASE_URL = 'sqlite:///../app.db'

    # Authjwt
    authjwt_secret_key: str = 'secret'
    authjwt_token_location: set = {'cookies'}
    authjwt_cookie_csrf_protect: bool = False


settings = Settings()
