/** 外部import */
import React, { FC } from 'react';

/** 内部import */
import { Row } from '../organisms/Row';
import { requests } from '../../api/request';

export const Top: FC = () => {
  return (
    <div>
      <Row fetchUrl={requests.fetchNetflixOriginals} title={'Netflix Originals'} />
      <Row fetchUrl={requests.fetchTopRated} title={'Top Rated'} />
      <Row fetchUrl={requests.fetchTrending} title={'Trending'} />
      <Row fetchUrl={requests.fetchActionMovies} title={'Action Movies'} />
      <Row fetchUrl={requests.fetchComedyMovies} title={'Comedy Movies'} />
      <Row fetchUrl={requests.fetchDocumentMovies} title={'Document Movies'} />
      <Row fetchUrl={requests.fetchHorrorMovies} title={'Horror Movies'} />
      <Row fetchUrl={requests.fetchRomanceMovies} title={'Romance Movies'} />
    </div>
  );
};
