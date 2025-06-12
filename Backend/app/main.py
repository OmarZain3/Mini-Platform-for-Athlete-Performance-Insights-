from fastapi import FastAPI
from app.database import Base, engine
from fastapi.middleware.cors import CORSMiddleware
from .routers import athletes, videos, metrics, dashboard, auth
from fastapi.staticfiles import StaticFiles


Base.metadata.create_all(bind=engine)

app = FastAPI()

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(athletes.router, prefix="/athletes", tags=["Athletes"])
app.include_router(videos.router, prefix="/videos", tags=["Videos"])
app.include_router(metrics.router, prefix="/metrics", tags=["Metrics"])
app.include_router(dashboard.router, prefix="/dashboard", tags=["Dashboard"])
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
