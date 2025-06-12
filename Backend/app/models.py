from sqlalchemy import Column, String, Integer, DateTime, ForeignKey, Float, Table
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base
import uuid

athlete_video_table = Table(
    "athlete_video",
    Base.metadata,
    Column("athlete_id", ForeignKey("athletes.id"), primary_key=True),
    Column("video_id", ForeignKey("videos.id"), primary_key=True),
)

class Athlete(Base):
    __tablename__ = "athletes"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, nullable=False)
    sport = Column(String, nullable=False)
    age = Column(Integer)
    created_at = Column(DateTime, default=datetime.utcnow)
    videos = relationship("Video", secondary=athlete_video_table, back_populates="athletes")

class Video(Base):
    __tablename__ = "videos"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    file_path = Column(String, nullable=False)
    upload_date = Column(DateTime, default=datetime.utcnow)
    duration = Column(Float)
    status = Column(String, default="Processing")
    athletes = relationship("Athlete", secondary=athlete_video_table, back_populates="videos")
    metrics = relationship("PerformanceMetric", back_populates="video", cascade="all, delete-orphan")

class PerformanceMetric(Base):
    __tablename__ = "performance_metrics"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    video_id = Column(String, ForeignKey("videos.id"))
    athlete_id = Column(String, ForeignKey("athletes.id"))
    metric_name = Column(String, nullable=False)
    value = Column(Float, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)
    video = relationship("Video", back_populates="metrics")
    athlete = relationship("Athlete")
