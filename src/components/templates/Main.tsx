/** 外部import */
import { FC, memo } from 'react';
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
  isLoading1: boolean;
  isLoading2: boolean;
  isLoading3: boolean;
  isLoading4: boolean;
  isLoading5: boolean;
  isLoading6: boolean;
  isLoading7: boolean;
  mediaTypeTv: string;
  mediaTypeMovie: string;
};

export const Main: FC<Props> = memo((props) => {
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
    isLoading1,
    isLoading2,
    isLoading3,
    isLoading4,
    isLoading5,
    isLoading6,
    isLoading7,
    mediaTypeTv,
    mediaTypeMovie,
  } = props;

  return (
    <SBody>
      {/* ヘッダー */}
      <Header home userName={userName} />
      {/* バナー */}
      <Banner data={netflixOriginals} mediaType={mediaTypeTv} isLoading={isLoading1} />
      {/* <Loading /> */}
      {/* 映画一覧 */}
      <MoviesList data={netflixOriginals} title={categoryTitle1} mediaType={mediaTypeTv} isLoading={isLoading1} />
      <MoviesList data={topRated} title={categoryTitle2} mediaType={mediaTypeMovie} isLoading={isLoading2} />
      <MoviesList data={actionMovies} title={categoryTitle3} mediaType={mediaTypeMovie} isLoading={isLoading3} />
      <MoviesList data={comedyMovies} title={categoryTitle4} mediaType={mediaTypeMovie} isLoading={isLoading4} />
      <MoviesList data={documentMovies} title={categoryTitle5} mediaType={mediaTypeMovie} isLoading={isLoading5} />
      <MoviesList data={horrorMovies} title={categoryTitle6} mediaType={mediaTypeMovie} isLoading={isLoading6} />
      <MoviesList data={romanceMovies} title={categoryTitle7} mediaType={mediaTypeMovie} isLoading={isLoading7} />
    </SBody>
  );
});

Main.displayName = 'Main';

/** style */
const SBody = styled.div`
  padding-bottom: 80px;

  @media (min-width: 768px) {
    padding-bottom: 120px;
  }
`;
