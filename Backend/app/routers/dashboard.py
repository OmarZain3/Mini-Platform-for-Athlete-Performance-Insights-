from fastapi import APIRouter, Depends, Query
from typing import List, Optional
from datetime import datetime
from sqlalchemy.orm import Session
from .. import schemas, crud, database

router = APIRouter()

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=List[schemas.AthleteDashboard])
def dashboard_view(
    sport: Optional[str] = Query(None),
    from_date: Optional[datetime] = Query(None),
    to_date: Optional[datetime] = Query(None),
    db: Session = Depends(get_db)
):
    return crud.get_dashboard_data(db, sport, from_date, to_date)
