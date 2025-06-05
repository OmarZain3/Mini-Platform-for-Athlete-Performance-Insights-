from sqlalchemy.orm import Session
from . import models, schemas
import uuid

# Create an athlete
def create_athlete(db: Session, athlete: schemas.AthleteCreate):
    db_athlete = models.Athlete(
        id=str(uuid.uuid4()),
        name=athlete.name,
        sport=athlete.sport,
        age=athlete.age
    )
    db.add(db_athlete)
    db.commit()
    db.refresh(db_athlete)
    return db_athlete

# List all athletes
def get_athletes(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Athlete).offset(skip).limit(limit).all()

# Get single athlete
def get_athlete(db: Session, athlete_id: str):
    return db.query(models.Athlete).filter(models.Athlete.id == athlete_id).first()

# Update athlete
def update_athlete(db: Session, athlete_id: str, updates: schemas.AthleteCreate):
    athlete = get_athlete(db, athlete_id)
    if athlete:
        athlete.name = updates.name
        athlete.sport = updates.sport
        athlete.age = updates.age
        db.commit()
        db.refresh(athlete)
    return athlete

# Delete athlete
def delete_athlete(db: Session, athlete_id: str):
    athlete = get_athlete(db, athlete_id)
    if athlete:
        db.delete(athlete)
        db.commit()
    return athlete
