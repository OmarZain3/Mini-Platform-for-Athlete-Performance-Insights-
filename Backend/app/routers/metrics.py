from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import schemas, crud, database

router = APIRouter()

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.PerformanceMetric)
def add_metric(metric: schemas.PerformanceMetricCreate, db: Session = Depends(get_db)):
    return crud.create_metric(db, metric)

@router.get("/athlete/{athlete_id}", response_model=List[schemas.PerformanceMetric])
def list_metrics(athlete_id: str, db: Session = Depends(get_db)):
    return crud.get_metrics_by_athlete(db, athlete_id)
