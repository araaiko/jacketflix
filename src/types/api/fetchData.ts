/** TMDBから取得できるデータの型 */
export type FetchData = {
  page: number;
  results: MovieInfo[];
  total_pages: number;
  total_results: number;
};

export type MovieInfo = {
  adult: boolean;
  backdrop_path: string;
  id: number;
  name?: string;
  title?: string;
  original_language: string;
  original_name?: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  origin_country: string[];
};
