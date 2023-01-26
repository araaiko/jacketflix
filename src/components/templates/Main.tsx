/** 外部import */
import { FC } from 'react';

/** 内部import */
import type { MovieInfo } from '../../types/api/fetchData';
import { MoviesList } from '../organisms/MoviesList';

type Props = {
  netflixOriginals: MovieInfo[];
  topRated: MovieInfo[];
  trending: MovieInfo[];
  actionMovies: MovieInfo[];
  comedyMovies: MovieInfo[];
  documentMovies: MovieInfo[];
  horrorMovies: MovieInfo[];
  RomanceMovies: MovieInfo[];
};

export const Main: FC<Props> = (props) => {
  const {
    netflixOriginals,
    topRated,
    trending,
    actionMovies,
    comedyMovies,
    documentMovies,
    horrorMovies,
    RomanceMovies,
  } = props;

  return (
    <>
      {/* ヘッダー */}
      {/* バナー */}
      {/* 映画一覧 */}
      <MoviesList data={netflixOriginals} title={'Netflix Originals'} />
      <MoviesList data={topRated} title={'Top Rated'} />
      <MoviesList data={trending} title={'Trending'} />
      <MoviesList data={actionMovies} title={'Action Movies'} />
      <MoviesList data={comedyMovies} title={'Comedy Movies'} />
      <MoviesList data={documentMovies} title={'Document Movies'} />
      <MoviesList data={horrorMovies} title={'Horror Movies'} />
      <MoviesList data={RomanceMovies} title={'Romance Movies'} />
    </>
  );
};
