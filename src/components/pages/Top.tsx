/** 外部import */
import React, { FC, useEffect, useState } from 'react';

/** 内部import */
import type { MovieInfo, FetchData } from '../../types/api/fetchData';
import { instance } from '../../api/axios';
import { requests } from '../../api/request';
import { Main } from '../templates';

type Movie = MovieInfo;
type PromiseFetchData = (fetchUrl: string, setState: React.Dispatch<Movie[]>) => Promise<void>;

export const Top: FC = () => {
  const [netflixOriginals, setNetflixOriginals] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [actionMovies, setActionMovies] = useState<Movie[]>([]);
  const [comedyMovies, setComedyMovies] = useState<Movie[]>([]);
  const [documentMovies, setDocumentMovies] = useState<Movie[]>([]);
  const [horrorMovies, setHorrorMovies] = useState<Movie[]>([]);
  const [RomanceMovies, setRomanceMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchData: PromiseFetchData = async (fetchUrl, setState) => {
      const request = await instance.get<FetchData>(fetchUrl);
      setState(request.data.results);
    };

    void fetchData(requests.fetchNetflixOriginals, setNetflixOriginals);
    void fetchData(requests.fetchTopRated, setTopRated);
    void fetchData(requests.fetchActionMovies, setActionMovies);
    void fetchData(requests.fetchComedyMovies, setComedyMovies);
    void fetchData(requests.fetchDocumentMovies, setDocumentMovies);
    void fetchData(requests.fetchHorrorMovies, setHorrorMovies);
    void fetchData(requests.fetchRomanceMovies, setRomanceMovies);
  }, []);

  return (
    <Main
      netflixOriginals={netflixOriginals}
      topRated={topRated}
      actionMovies={actionMovies}
      comedyMovies={comedyMovies}
      documentMovies={documentMovies}
      horrorMovies={horrorMovies}
      RomanceMovies={RomanceMovies}
    />
  );
};
