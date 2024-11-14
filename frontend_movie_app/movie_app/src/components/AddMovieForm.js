import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import MovieService from '../services/MovieService';  // Service to interact with the backend
import AlertBox from '../components/AlertBox';

const AddMovieForm = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [rating, setRating] = useState('');
  const [genre, setGenre] = useState('');
  const [error, setError] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
        window.location.reload(); 
      }, 65000); 

      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [showAlert, onClose]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newMovie = {
        movie_id: null,
        title,
        description,
        release_year: parseInt(releaseYear),
        rating: parseFloat(rating),
        genre,
        duration_minutes: null,
        created_at: null
      };
      await MovieService.addMovie(newMovie);  // Add the movie via MovieService
      setAlertMessage("Movie added successfully!");
      setShowAlert(true);

      onClose();  // Close the modal after the movie is added
    } catch (err) {
        console.error('Error:', err);  // Log the error for debugging
        setError(err.response ? err.response.data.msg : 'Failed to add movie');
      //setError('Failed to add movie');
      setAlertMessage("Failed to add movie: " + (err.response ? err.response.data.msg : 'Unknown error'));
      setShowAlert(true);
    }
  };

  return (
    <>
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="releaseYear">
        <Form.Label>Release Year</Form.Label>
        <Form.Control
          type="number"
          value={releaseYear}
          onChange={(e) => setReleaseYear(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="rating">
        <Form.Label>Rating</Form.Label>
        <Form.Control
          type="text"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="genre">
        <Form.Label>Genre</Form.Label>
        <Form.Control
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
      </Form.Group>

      {error && <div className="text-danger">{error}</div>}

      <Button variant="primary" type="submit">
        Add Movie
      </Button>
    </Form>
    {showAlert && <AlertBox message={alertMessage} onClose={() => setShowAlert(false)} />}
    </>
  );
};

export default AddMovieForm;
