/** 外部import */
import React, { FC, startTransition, useContext, useEffect, useState } from 'react';

/** 内部import */
import type { MovieInfo, FetchData } from '../../types/api/fetchData';
import { instance } from '../../api/axios';
import { requests } from '../../api/request';
import { Main } from '../templates';
import { UserContext } from '../../providers/UserProvider';

type Movie = MovieInfo;
type PromiseFetchData = (
  fetchUrl: string,
  setState: React.Dispatch<Movie[]>,
  setIsLoading: React.Dispatch<boolean>
) => Promise<void>;

export const Top: FC = () => {
  const { user } = useContext(UserContext);
  const [netflixOriginals, setNetflixOriginals] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [actionMovies, setActionMovies] = useState<Movie[]>([]);
  const [comedyMovies, setComedyMovies] = useState<Movie[]>([]);
  const [documentMovies, setDocumentMovies] = useState<Movie[]>([]);
  const [horrorMovies, setHorrorMovies] = useState<Movie[]>([]);
  const [RomanceMovies, setRomanceMovies] = useState<Movie[]>([]);
  const [isLoading1, setIsLoading1] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);
  const [isLoading3, setIsLoading3] = useState(true);
  const [isLoading4, setIsLoading4] = useState(true);
  const [isLoading5, setIsLoading5] = useState(true);
  const [isLoading6, setIsLoading6] = useState(true);
  const [isLoading7, setIsLoading7] = useState(true);

  useEffect(() => {
    const fetchData: PromiseFetchData = async (fetchUrl, setState, setIsLoading) => {
      const request = await instance.get<FetchData>(fetchUrl);
      startTransition(() => {
        setState(request.data.results);
      });
      setIsLoading(false);
    };

    void fetchData(requests.fetchNetflixOriginals, setNetflixOriginals, setIsLoading1);
    void fetchData(requests.fetchTopRated, setTopRated, setIsLoading2);
    void fetchData(requests.fetchActionMovies, setActionMovies, setIsLoading3);
    void fetchData(requests.fetchComedyMovies, setComedyMovies, setIsLoading4);
    void fetchData(requests.fetchDocumentMovies, setDocumentMovies, setIsLoading5);
    void fetchData(requests.fetchHorrorMovies, setHorrorMovies, setIsLoading6);
    void fetchData(requests.fetchRomanceMovies, setRomanceMovies, setIsLoading7);
  }, []);

  return (
    <Main
      userName={user.username}
      netflixOriginals={netflixOriginals}
      categoryTitle1={'Netflix Originals'}
      isLoading1={isLoading1}
      topRated={topRated}
      categoryTitle2={'Top Rated'}
      isLoading2={isLoading2}
      actionMovies={actionMovies}
      categoryTitle3={'Action Movies'}
      isLoading3={isLoading3}
      comedyMovies={comedyMovies}
      categoryTitle4={'Comedy Movies'}
      isLoading4={isLoading4}
      documentMovies={documentMovies}
      categoryTitle5={'Document Movies'}
      isLoading5={isLoading5}
      horrorMovies={horrorMovies}
      categoryTitle6={'Horror Movies'}
      isLoading6={isLoading6}
      romanceMovies={RomanceMovies}
      categoryTitle7={'Romance Movies'}
      isLoading7={isLoading7}
      mediaTypeTv={'tv'}
      mediaTypeMovie={'movie'}
    />
  );
};
