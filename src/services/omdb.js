const BASE_URL = 'https://www.omdbapi.com/';

/**
 * Search movies by title.
 * @param {string} term - Search term (movie title).
 * @param {number} page - Page number (default 1). Each page returns 10 results.
 * @returns {Promise<Object>} OMDb response containing `Search` array.
 */
export const searchMovies = async (term, page = 1) => {
    const apiKey = import.meta.env.VITE_OMDB_API_KEY;
    const url = `${BASE_URL}?apikey=${apiKey}&s=${encodeURIComponent(term)}&page=${page}`;
    console.log('🔍 Searching movies with URL:', url);
    const response = await fetch(url);
    const data = await response.json();
    console.log('📦 Search results:', data);
    return data;
};

/**
 * Get detailed info for a movie by IMDb ID.
 * @param {string} imdbID - The IMDb identifier (e.g., tt0111161).
 * @returns {Promise<Object>} Detailed movie object.
 */
export const getMovieDetails = async (imdbID) => {
    const apiKey = import.meta.env.VITE_OMDB_API_KEY;
    const url = `${BASE_URL}?apikey=${apiKey}&i=${imdbID}&plot=full`;
    console.log('🎬 Fetching movie details for:', imdbID);
    const response = await fetch(url);
    const data = await response.json();
    console.log('📋 Movie details:', data);
    return data;
};
