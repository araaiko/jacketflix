/** 外部import */
import React, { FC, useEffect, useState } from 'react';

/** 内部import */
import type { FetchData } from '../../types/api/fetchData';
import { instance } from '../../api/axios';

type Props = {
  fetchUrl: string;
};

type Movie = {
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


export const Row: FC<Props> = (props) => {
  const { fetchUrl } = props;
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function fetchData(): Promise<Movie[]> {
      const request = await instance.get<FetchData>(fetchUrl);
      setMovies(request.data.results);
      return request.data.results;
    }
    void fetchData();
  }, [fetchUrl]);

  console.log(movies);

  return <div></div>;
};
