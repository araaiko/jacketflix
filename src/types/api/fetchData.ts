/** TMDBから取得できるデータの型 */
export type FetchData = {
  page: number;
  results: MovieInfo[];
  total_pages: number;
  total_results: number;
};

// useStateの初期値にnullをセットすることがあるため、
// 各プロパティが存在しなくてもエラーにならないよう ? をつけている
export type MovieInfo = {
  adult?: boolean;
  backdrop_path?: string;
  id?: number;
  name?: string;
  title?: string;
  original_language?: string;
  original_name?: string;
  overview?: string;
  poster_path?: string;
  media_type?: string;
  genre_ids?: number[];
  popularity?: number;
  first_air_date?: string;
  vote_average?: number;
  vote_count?: number;
  origin_country?: string[];
};

// 作品情報ページで使用
export type FetchDetailData = {
  adult?: boolean;
  backdrop_path?: string;
  created_by?: [
    {
      id: number;
      credit_id: string;
      name: string;
      gender: number;
      profile_path: null | string;
    }
  ];
  episode_run_time?: number[];
  first_air_date?: string;
  genres?: [
    {
      id: number;
      name: string;
    }
  ];
  homepage?: string;
  id?: number;
  in_production?: boolean;
  languages?: string[];
  last_air_date?: string;
  last_episode_to_air?: {
    air_date: string;
    episode_number: number;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string;
    vote_average: number;
    vote_count: number;
  };
  name?: string;
  title?: string;
  next_episode_to_air?: null | number | string;
  networks?: [
    {
      id: number;
      name: string;
      logo_path: string;
      origin_country: string;
    }
  ];
  number_of_episodes?: number;
  number_of_seasons?: number;
  origin_country?: string[];
  original_language?: string;
  original_name?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  production_companies?: [
    {
      id: number;
      logo_path: string;
      name: string;
      origin_country: string;
    }
  ];
  production_countries?: [
    {
      iso_3166_1: string;
      name: string;
    }
  ];
  seasons?: [
    {
      air_date: string;
      episode_count: number;
      id: number;
      name: string;
      overview: string;
      poster_path: string;
      season_number: number;
    }
  ];
  spoken_languages?: [
    {
      english_name: string;
      iso_639_1: string;
      name: string;
    }
  ];
  status?: string;
  tagline?: string;
  type?: string;
  vote_average?: number;
  vote_count?: number;
};

// TMDBからYouTube ID を取得する時に使用
export type FetchVideoData = {
  id: number;
  results: [
    {
      iso_639_1: string;
      iso_3166_1: string;
      name: string;
      key: string;
      site: string;
      size: number;
      type: string;
      official: boolean;
      published_at: string;
      id: string;
    }
  ];
};
