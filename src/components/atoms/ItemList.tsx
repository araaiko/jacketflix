/** 外部import */
import { FC } from 'react';
import styled from 'styled-components';

/** 内部import */
import type { MovieInfo } from '../../types/api/fetchData';

type Props = {
  movies: MovieInfo[];
  itemHeight: string;
};

export const ItemList: FC<Props> = (props) => {
  const { movies, itemHeight } = props;

  return (
    <SList>
      {movies.map((movie) => (
        <SItem key={movie.id} itemHeight={itemHeight}>
          <SImg src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.name} />
        </SItem>
      ))}
    </SList>
  );
};

/** style */
type SItemProps = {
  itemHeight: string;
};

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

const SItem = styled.li<SItemProps>`
  list-style-type: none;
  object-fit: contain;
  margin: 10px;
  width: 100%;
  height: ${({ itemHeight }) => itemHeight};
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
