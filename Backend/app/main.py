from fastapi import FastAPI
from .database import Base, engine
from .routers import athletes, videos, metrics, dashboard

Base.metadata.create_all(bind=engine)

app = FastAPI()

# Register routers
app.include_router(athletes.router, prefix="/athletes", tags=["Athletes"])
app.include_router(videos.router, prefix="/videos", tags=["Videos"])
app.include_router(metrics.router, prefix="/metrics", tags=["Metrics"])
app.include_router(dashboard.router, prefix="/dashboard", tags=["Dashboard"])
