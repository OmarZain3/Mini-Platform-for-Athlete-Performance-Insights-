from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class AthleteBase(BaseModel):
    name: str
    sport: str
    age: int

class AthleteCreate(AthleteBase):
    pass

class Athlete(AthleteBase):
    id: str
    created_at: datetime

    class Config:
        orm_mode = True


class VideoBase(BaseModel):
    athlete_ids: List[str]  # list of athlete UUIDs

class VideoCreate(VideoBase):
    pass  # no extra fields — upload file via multipart/form-data

class Video(VideoBase):
    id: str
    file_path: str
    upload_date: datetime
    duration: float
    status: str

    class Config:
        orm_mode = True


class PerformanceMetricBase(BaseModel):
    video_id: str
    athlete_id: str
    metric_name: str
    value: float

class PerformanceMetricCreate(PerformanceMetricBase):
    pass

class PerformanceMetric(PerformanceMetricBase):
    id: str
    timestamp: datetime

    class Config:
        orm_mode = True


class DashboardMetric(BaseModel):
    metric_name: str
    value: float
    timestamp: datetime

    class Config:
        orm_mode = True

class DashboardVideo(BaseModel):
    id: str
    file_path: str
    upload_date: datetime
    status: str
    duration: float

    class Config:
        orm_mode = True

class AthleteDashboard(BaseModel):
    id: str
    name: str
    sport: str
    age: int
    created_at: datetime
    videos: List[DashboardVideo]
    metrics: List[DashboardMetric]

    class Config:
        orm_mode = True