import time
from typing import Optional
from sqlalchemy.orm import Session
from . import models, schemas
import uuid
import os
from datetime import datetime

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

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

def get_athletes(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Athlete).offset(skip).limit(limit).all()

def get_athlete(db: Session, athlete_id: str):
    return db.query(models.Athlete).filter(models.Athlete.id == athlete_id).first()

def update_athlete(db: Session, athlete_id: str, updates: schemas.AthleteCreate):
    athlete = get_athlete(db, athlete_id)
    if athlete:
        athlete.name = updates.name
        athlete.sport = updates.sport
        athlete.age = updates.age
        db.commit()
        db.refresh(athlete)
    return athlete

def delete_athlete(db: Session, athlete_id: str):
    athlete = get_athlete(db, athlete_id)
    if athlete:
        db.delete(athlete)
        db.commit()
    return athlete


def save_video_file(file) -> str:
    ext = file.filename.split('.')[-1]
    filename = f"{uuid.uuid4()}.{ext}"
    filepath = os.path.join(UPLOAD_DIR, filename)
    with open(filepath, "wb") as f:
        f.write(file.file.read())
    return filepath

def create_video(db: Session, file, athlete_ids: list[str]):
    filepath = save_video_file(file)
    video = models.Video(
        file_path=filepath,
        duration=30.0,  
        status="Processing"
    )

    athletes = db.query(models.Athlete).filter(models.Athlete.id.in_(athlete_ids)).all()
    video.athletes.extend(athletes)
    db.add(video)
    db.commit()
    db.refresh(video)
    return video

def get_videos(db: Session):
    return db.query(models.Video).all()


def create_metric(db: Session, metric: schemas.PerformanceMetricCreate):
    db_metric = models.PerformanceMetric(
        id=str(uuid.uuid4()),
        video_id=metric.video_id,
        athlete_id=metric.athlete_id,
        metric_name=metric.metric_name,
        value=metric.value,
    )
    db.add(db_metric)
    db.commit()
    db.refresh(db_metric)
    return db_metric

def get_metrics_by_athlete(db: Session, athlete_id: str):
    return db.query(models.PerformanceMetric).filter(models.PerformanceMetric.athlete_id == athlete_id).all()

def get_dashboard_data(db: Session, sport: Optional[str] = None, from_date: Optional[datetime] = None, to_date: Optional[datetime] = None):
    query = db.query(models.Athlete)
    if sport:
        query = query.filter(models.Athlete.sport == sport)
    athletes = query.all()

    result = []
    for athlete in athletes:    
        videos = athlete.videos
        if from_date or to_date:
            videos = [
                v for v in videos
                if (not from_date or v.upload_date >= from_date) and (not to_date or v.upload_date <= to_date)
            ]

        metrics = db.query(models.PerformanceMetric).filter(
            models.PerformanceMetric.athlete_id == athlete.id
        ).all()

        result.append({
            "id": athlete.id,
            "name": athlete.name,
            "sport": athlete.sport,
            "age": athlete.age,
            "created_at": athlete.created_at,
            "videos": videos,
            "metrics": metrics
        })
    return result

def complete_video_processing(db: Session, video_id: str, delay: int = 10):
    time.sleep(delay) 
    video = db.query(models.Video).filter(models.Video.id == video_id).first()
    if video:
        video.status = "Complete"
        db.commit()