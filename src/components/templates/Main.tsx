/** 外部import */
import { FC } from 'react';
import styled from 'styled-components';

/** 内部import */
import type { MovieInfo } from '../../types/api/fetchData';
import { Banner, Header, MoviesList } from '../organisms';

type Props = {
  userName: string;
  netflixOriginals: MovieInfo[];
  topRated: MovieInfo[];
  actionMovies: MovieInfo[];
  comedyMovies: MovieInfo[];
  documentMovies: MovieInfo[];
  horrorMovies: MovieInfo[];
  romanceMovies: MovieInfo[];
  categoryTitle1: string;
  categoryTitle2: string;
  categoryTitle3: string;
  categoryTitle4: string;
  categoryTitle5: string;
  categoryTitle6: string;
  categoryTitle7: string;
  mediaTypeTv: string;
  mediaTypeMovie: string;
};

export const Main: FC<Props> = (props) => {
  const {
    userName,
    netflixOriginals,
    topRated,
    actionMovies,
    comedyMovies,
    documentMovies,
    horrorMovies,
    romanceMovies,
    categoryTitle1,
    categoryTitle2,
    categoryTitle3,
    categoryTitle4,
    categoryTitle5,
    categoryTitle6,
    categoryTitle7,
    mediaTypeTv,
    mediaTypeMovie,
  } = props;

  return (
    <SBody>
      {/* ヘッダー */}
      <Header home userName={userName} />
      {/* バナー */}
      <Banner data={netflixOriginals} mediaType={mediaTypeTv} />
      {/* 映画一覧 */}
      <MoviesList data={netflixOriginals} title={categoryTitle1} mediaType={mediaTypeTv} />
      <MoviesList data={topRated} title={categoryTitle2} mediaType={mediaTypeMovie} />
      <MoviesList data={actionMovies} title={categoryTitle3} mediaType={mediaTypeMovie} />
      <MoviesList data={comedyMovies} title={categoryTitle4} mediaType={mediaTypeMovie} />
      <MoviesList data={documentMovies} title={categoryTitle5} mediaType={mediaTypeMovie} />
      <MoviesList data={horrorMovies} title={categoryTitle6} mediaType={mediaTypeMovie} />
      <MoviesList data={romanceMovies} title={categoryTitle7} mediaType={mediaTypeMovie} />
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
