/** TMDB */
// const API_KEY = '8a7107070311c93d3e79e4852bcffb5a';

export const requests = {
  // fetchTrending: `/trending/all/week?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-us`,
  fetchNetflixOriginals: `/discover/tv?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_networks=213`,
  fetchTopRated: `/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-us`,
  fetchActionMovies: `/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_genres=10749`,
  fetchDocumentMovies: `/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_genres=99`,
  fetchMovieDetail: `/movie/{movie_id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`,
  fetchTvDetail: `/tv/{movie_id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`,
};
