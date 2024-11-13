from fastapi import FastAPI, HTTPException, Depends, Request
#from pydantic import BaseModel
from typing import List
from sqlalchemy.orm import Session
from database import get_db,  engine
from models import Base, Movie
from schemas import MovieRead, MovieCreate
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware

#from fastapi import Request


app = FastAPI()

origins = [
    "http://localhost:3000",  # React dev server
]
templates = Jinja2Templates(directory="templates")

Base.metadata.create_all(bind=engine)

# Add CORS middleware to the FastAPI app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow all origins in the list
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allow all headers
)


@app.get("/movies", response_model=List[MovieRead])
def get_movies(db: Session = Depends(get_db)):
    #print("inside get_movies fn::")
    movies = db.query(Movie).all()
    if not movies:
        raise HTTPException(status_code=404, detail="No movies found")
    return movies

@app.get("/", response_class=HTMLResponse)
def get_all_movies(request: Request, db: Session = Depends(get_db)):
    # Convert each movie ORM object to a dictionary
    movies = db.query(Movie).all()
    movies_dicts = [
        {
            "title": movie.title,
            "description": movie.description,
            "release_year": movie.release_year,
            "rating": movie.rating,
            "genre": movie.genre,
        }
        for movie in movies
    ]
    
    return templates.TemplateResponse("movie_card.html", {"request": request, "movies": movies_dicts})

@app.get("/search", response_class=HTMLResponse)
async def search_movies(request: Request, query: str = "", db: Session = Depends(get_db)):
    #print("Fetched movies:", movies)
    movies = db.query(Movie).filter(Movie.title.ilike(f"%{query}%")).all()
    
    return templates.TemplateResponse("details.html", {"request": request, "movies": movies, "query": query})



# @app.get("/movies/{title}", response_class=HTMLResponse)
# def get_movie(title: str, db: Session = Depends(get_db)):
#     movie = db.query(Movie).filter(Movie.title == title).first()
#     if not movie:
#         raise HTTPException(status_code=404, detail="Movie not found")
#     return templates.TemplateResponse("movie_card.html", {"request": request, "movie": movie})
    
@app.get("/movies/{title}", response_model=List[MovieCreate])
def get_movie(title: str, db: Session = Depends(get_db)):
    movie = db.query(Movie).filter(Movie.title.ilike(f"%{title}%")).all()
    print(movie)

    if not movie:
        raise HTTPException(status_code=404, detail="Movie not found")
    return movie  

# @app.get("/movies/{movie_id}", response_model=MovieCreate)
# def get_movie(movie_id: int, db: Session = Depends(get_db)):
#     movie = db.query(Movie).filter(Movie.movie_id == movie_id).first()

#     if not movie:
#         raise HTTPException(status_code=404, detail="Movie not found")
#     return movie

@app.post("/movies/", response_model=MovieCreate)
def add_movie(movie: MovieCreate, db: Session = Depends(get_db)):
    db_movie = db.query(Movie).filter(Movie.title == movie.title).first()
    if db_movie:
        raise HTTPException(status_code=400, detail="Movie already exists")
    

    
    
    new_movie = Movie(
        title=movie.title,
        description=movie.description,
        release_year=movie.release_year,
        rating=movie.rating,
        genre=movie.genre
    )
    db.add(new_movie)
    db.commit()
    db.refresh(new_movie)
    return new_movie