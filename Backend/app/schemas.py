from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class PerformanceMetricBase(BaseModel):
    metric_name: str
    value: float


class PerformanceMetricCreate(PerformanceMetricBase):
    athlete_id: str
    video_id: str


class PerformanceMetricUpdate(PerformanceMetricBase):
    pass


class PerformanceMetric(PerformanceMetricBase):
    id: str
    timestamp: datetime
    athlete_id: str
    video_id: str


    class Config:
        orm_mode = True


class VideoBase(BaseModel):
    file_path: str
    duration: Optional[float] = None


class VideoCreate(VideoBase):
    athlete_ids: List[str]


class Video(VideoBase):
    id: str
    upload_date: datetime
    status: str
    metrics: List[PerformanceMetric]

    class Config:
        orm_mode = True


class AthleteBase(BaseModel):
    name: str
    sport: str
    age: float


class AthleteCreate(AthleteBase):
    pass


class Athlete(AthleteBase):
    id: str
    created_at: datetime
    videos: List[Video]

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
    metrics: List[PerformanceMetric]


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