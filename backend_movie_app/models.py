from sqlalchemy import Column, Integer, String, Float
from database import Base

class Movie(Base):
    __tablename__ = 'movies'

    movie_id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String, unique=True, nullable=False)
    description = Column(String)
    release_year = Column(Integer)
    rating = Column(Float)
    genre = Column(String)
    duration_minutes = Column(Integer, nullable=True)