import axios from 'axios';

const API_URL = 'http://localhost:8000/movies';
const API_URL1 = 'http://localhost:8000/movies/{title}';
const API_URL2 = 'http://localhost:8000/movies/';


const getMovies = async (query = '') => {
  try {
    const response = await axios.get(API_URL, {
      params: { title: query }
    });
    return response.data;  // Return the movie data
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];  // Return an empty array in case of error
  }
};

const getMovieByTitle = async (query = '') => {
    try {
      const url = API_URL1.replace('{title}', query);
      const response = await axios.get(url);
      return response.data;  // Return the movie data
    } catch (error) {
      console.error('Error fetching movies:', error);
      return [];  // Return an empty array in case of error
    }
  };

const addMovie = async (movieData) => {
    try {
      const response = await axios.post(API_URL2, movieData);
      return response.data;
    } catch (error) {
      console.error("Error adding movie:", error);
      throw error;  // Rethrow error to propagate it back to the form
    }
  };
  
  

export default {
  getMovies,            // Exporting an object containing getMovies
  getMovieByTitle,      // Exporting an object containing getMovieByTitle
  addMovie,
};
