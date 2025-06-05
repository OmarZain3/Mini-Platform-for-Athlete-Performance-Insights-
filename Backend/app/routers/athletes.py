from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import crud, schemas, models
from ..database import SessionLocal

router = APIRouter()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.Athlete)
def create_athlete(athlete: schemas.AthleteCreate, db: Session = Depends(get_db)):
    return crud.create_athlete(db, athlete)

@router.get("/", response_model=List[schemas.Athlete])
def read_athletes(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_athletes(db, skip, limit)

@router.get("/{athlete_id}", response_model=schemas.Athlete)
def read_athlete(athlete_id: str, db: Session = Depends(get_db)):
    athlete = crud.get_athlete(db, athlete_id)
    if not athlete:
        raise HTTPException(status_code=404, detail="Athlete not found")
    return athlete

@router.put("/{athlete_id}", response_model=schemas.Athlete)
def update_athlete(athlete_id: str, updates: schemas.AthleteCreate, db: Session = Depends(get_db)):
    updated = crud.update_athlete(db, athlete_id, updates)
    if not updated:
        raise HTTPException(status_code=404, detail="Athlete not found")
    return updated

@router.delete("/{athlete_id}")
def delete_athlete(athlete_id: str, db: Session = Depends(get_db)):
    deleted = crud.delete_athlete(db, athlete_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Athlete not found")
    return {"message": "Athlete deleted"}
