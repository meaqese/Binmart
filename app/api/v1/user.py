from fastapi import APIRouter, Depends
from requests import Session
from app.core import settings
from app.api.deps import get_db
from app import crud

router = APIRouter()


@router.get('/top-up/check-arrive/{amount}/{comment}')
def check_money_arrive(amount: int, comment: str, db: Session = Depends(get_db)):
    session = Session()
    session.headers['Authorization'] = f'Bearer {settings.QIWI_TOKEN}'
    data = session.get(
        f'{settings.QIWI_API_URL}/payment-history/v2/persons/{settings.QIWI_WALLET}/payments',
        params={'rows': 10}
    ).json()['data']

    for row in data:
        if row['sum']['amount'] == amount and row['comment'] == comment:
            username = comment.split('[')[0]

            if crud.top_balance(db, username, amount):
                return {'success': True}
    return {'success': False}
