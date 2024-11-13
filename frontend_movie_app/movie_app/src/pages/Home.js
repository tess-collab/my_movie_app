import React, { useState, useEffect } from 'react';
import MovieService from '../services/MovieService';  
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import { Container, Row, Col } from 'react-bootstrap';
import { Button, Modal } from 'react-bootstrap';
import AddMovieForm from '../components/AddMovieForm';
import './Home.css';

function Home() {
  const [movies, setMovies] = useState([]);  // State to store movie list
  const [loading, setLoading] = useState(true);  // State to track loading status
  const [showModal, setShowModal] = useState(false);  // State to control modal visibility

  

  // Fetch movies when the component mounts
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await MovieService.getMovies();  // calling getMovies from MovieService
        setMovies(data);  // Update the movie list state
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);  // Set loading to false once data is fetched
      }
    };

    fetchMovies();
    //setMovies(movies1)

  }, []);  // Empty array ensures this runs once when the component mounts

  // Handle search queries
  const handleSearch = async (query) => {
    setLoading(true);  // Set loading to true while fetching
    try {
      const data = await MovieService.getMovieByTitle(query); // Fetch movies by title
      console.log("Fetched movies data:", data);  
      setMovies(data);  // Update the movie list state
    } catch (error) {
      console.error("Error searching movies:", error);
    } finally {
      setLoading(false);  // Set loading to false once data is fetched
    }
  };

  // Toggle Modal visibility to show/hide the Add Movie form
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <Container>
       <h1 className="text-center my-5"> Movie App</h1>
       <div className="navbar-custom">
      <h4>Add a new movie here:</h4>
      <Button variant="primary" onClick={handleShowModal}>
        Add Movie
      </Button>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add a New Movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddMovieForm onClose={handleCloseModal} />  {/* Pass onClose to close the modal */}
        </Modal.Body>
      </Modal>
      </div> 
      <br />
      <br />
      <div className="bordered-container">
      <h3>Movie Search:</h3>  
      <SearchBar onSearch={handleSearch} />
      <Row>
        {loading ? (
          <div>Loading...</div>  
        ) : (
          movies.length === 0 ? (
            <div>No movies found.</div>  
          ) : (
            movies.map((movie) => (  // Render MovieCard components
              <Col key={movie.id} sm={12} md={6} lg={4}>
                <MovieCard movie={movie} />
              </Col>
            ))
          )
        )}
      </Row>
      </div>
      
      <br />
      
      
    </Container>
    
  );
}

export default Home;
