/** 外部import */
import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

/** 内部import */
import type { MovieInfo, FetchData } from '../../types/api/fetchData';
import { instance } from '../../api/axios';

type Props = {
  fetchUrl: string;
  title: string;
};
type Movie = MovieInfo;

export const Row: FC<Props> = (props) => {
  const { fetchUrl, title } = props;
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

  return (
    <SWrapper>
      <h2>{title}</h2>
      <SScrollText>scroll ▶︎</SScrollText>
      <SList>
        {movies.map((movie) => (
          <SItem key={movie.id}>
            <SImg src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.name} />
          </SItem>
        ))}
      </SList>
    </SWrapper>
  );
};

/** style */
const SWrapper = styled.div`
  margin-left: 20px;

  &:nth-child(n + 2) {
    margin-top: 50px;
  }
`;

const SList = styled.ul`
  width: auto;
  display: flex;
  overflow-y: hidden;
  overflow-x: scroll;
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 0;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const SItem = styled.li`
  list-style-type: none;
  object-fit: contain;
  margin: 10px;
  width: 100%;
  height: 250px;
  transition: transform 450ms;

  &:hover {
    cursor: pointer;
    transform: scale(1.09);
  }
`;

const SImg = styled.img`
  width: auto;
  height: 100%;
  border: none;
  vertical-align: bottom;
`;

const SScrollText = styled.p`
  text-align: right;
  font-weight: bold;
  font-size: 20px;
  margin: 0;
  margin-right: 10px;
`;
