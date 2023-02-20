/** 外部import */
import { FC } from 'react';
import styled from 'styled-components';

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
  const { netflixOriginals, topRated, actionMovies, comedyMovies, documentMovies, horrorMovies, RomanceMovies } = props;

  // const { user } = useContext(UserContext)
  // console.log(user);

  return (
    <SBody>
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
    </SBody>
  );
};

/** style */
const SBody = styled.div`
  padding-bottom: 80px;

  @media (min-width: 768px) {
    padding-bottom: 120px;
  }
`;
