/** 外部import */
import { FC } from 'react';

/** 内部import */
import type { MovieInfo } from '../../types/api/fetchData';
import { Banner, Header, MoviesList } from '../organisms';

type Props = {
  netflixOriginals: MovieInfo[];
  topRated: MovieInfo[];
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
    actionMovies,
    comedyMovies,
    documentMovies,
    horrorMovies,
    RomanceMovies,
  } = props;

  return (
    <>
      {/* ヘッダー */}
      <Header home />
      {/* バナー */}
      <Banner data={netflixOriginals} mediaType={'tv'} />
      {/* 映画一覧 */}
      <MoviesList data={netflixOriginals} title={'Netflix Originals'} mediaType={'tv'} />
      <MoviesList data={topRated} title={'Top Rated'} mediaType={'movie'} />
      <MoviesList data={actionMovies} title={'Action Movies'} mediaType={'movie'} />
      <MoviesList data={comedyMovies} title={'Comedy Movies'} mediaType={'movie'} />
      <MoviesList data={documentMovies} title={'Document Movies'} mediaType={'movie'} />
      <MoviesList data={horrorMovies} title={'Horror Movies'} mediaType={'movie'} />
      <MoviesList data={RomanceMovies} title={'Romance Movies'} mediaType={'movie'} />
    </>
  );
};
