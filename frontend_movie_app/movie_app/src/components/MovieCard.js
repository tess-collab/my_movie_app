import React from 'react';

function MovieCard({ movie }) {
  const { title, description, release_year, rating, genre, imageUrl } = movie;

  return (
    <div className="card shadow-sm">
      <img
        src={imageUrl || "https://wilmetteinstitute.org/wp-content/uploads/2021/01/Movie-Film-Reel-Clip-Art-edit-e1610725850220.jpg"}
        className="card-img-top"
        alt={title}
      />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <p className="card-text">
          <strong>Release Year:</strong> {release_year}
        </p>
        <p className="card-text">
          <strong>Rating:</strong> {rating}
        </p>
        <p className="card-text">
          <strong>Genre:</strong> {genre}
        </p>
        
      </div>
    </div>
  );
}

export default MovieCard;
