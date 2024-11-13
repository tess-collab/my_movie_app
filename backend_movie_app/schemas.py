from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class MovieCreate(BaseModel):
    movie_id: Optional[int] = None
    title: str
    description: str
    release_year: int
    rating: float
    genre: str
    duration_minutes: Optional[int] = None
    created_at: Optional[datetime] = None

    class Config:
        orm_mode = True  # This allows Pydantic to read data as if it were from an ORM model


class MovieRead(BaseModel):
    movie_id: int | None
    title: str | None
    description: str | None
    release_year: int | None
    rating: float | None
    genre: str | None
    duration_minutes: int | None
    created_at: Optional[datetime] = None

    class Config:
        orm_mode = True