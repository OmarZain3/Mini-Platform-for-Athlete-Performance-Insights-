from fastapi import APIRouter, UploadFile, File, Form, Depends, HTTPException , BackgroundTasks
from sqlalchemy.orm import Session
from typing import List
from app import models
from .. import schemas, crud, database

router = APIRouter()

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.Video)
async def upload_video(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    athlete_ids: List[str] = Form(...),
    db: Session = Depends(get_db),
):
    if not file.filename.lower().endswith((".mp4", ".mov")):
        raise HTTPException(status_code=400, detail="Invalid file type")
    video = crud.create_video(db, file, athlete_ids)
    background_tasks.add_task(crud.complete_video_processing, db, video.id)
    return video

@router.get("/", response_model=List[schemas.Video])
def list_videos(db: Session = Depends(get_db)):
    return crud.get_videos(db)

@router.delete("/{video_id}")
def delete_video(video_id: str, db: Session = Depends(get_db)):
    video = db.query(models.Video).filter(models.Video.id == video_id).first()
    if not video:
        raise HTTPException(status_code=404, detail="Video not found")

    db.delete(video)
    db.commit()
    return {"message": "Video deleted"}
