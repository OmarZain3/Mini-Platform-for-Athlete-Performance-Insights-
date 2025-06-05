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
