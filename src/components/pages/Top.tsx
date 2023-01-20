/** 外部import */
import React, { FC } from 'react';

/** 内部import */
import { Row } from '../organisms/Row';
import { requests } from '../../api/request';

export const Top: FC = () => {
  return (
    <div>
      <Row fetchUrl={requests.fetchActionMovies} />
      {/* <Row fetchUrl={requests.fetchComedyMovies} /> */}
      {/* <Row fetchUrl={requests.fetchDocumentMovies} /> */}
      {/* <Row fetchUrl={requests.fetchHorrorMovies} /> */}
      {/* <Row fetchUrl={requests.fetchNetflixOriginals} /> */}
      {/* <Row fetchUrl={requests.fetchRomanceMovies} /> */}
      {/* <Row fetchUrl={requests.fetchTopRated} /> */}
      {/* <Row fetchUrl={requests.fetchTrending} /> */}
    </div>
  );
};
