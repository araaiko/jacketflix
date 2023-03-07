/** 外部import */
import { FC, memo } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

/** 内部import */
import type { MovieInfo } from '../../types/api/fetchData';
import { onClickToWorkInfo } from '../../function/commonOnClick';

type Props = {
  movies: MovieInfo[];
  itemHeight: string;
  mediaType: string;
};

export const ItemList: FC<Props> = memo((props) => {
  const { movies, itemHeight, mediaType } = props;
  const navigate = useNavigate();

  return (
    <SList>
      {movies.map((movie) => (
        <SItem
          key={movie.id}
          itemHeight={itemHeight}
          onClick={() => {
            onClickToWorkInfo(movie.id, mediaType, navigate);
          }}
        >
          <SImg
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path ?? ''}`}
            alt={movie.title ?? movie.name ?? movie.original_name ?? ''}
          />
        </SItem>
      ))}
    </SList>
  );
});

ItemList.displayName = 'ItemList';

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

  @media (min-width: 768px) {
    padding-left: 40px;
  }
`;

const SItem = styled.li<SItemProps>`
  list-style-type: none;
  object-fit: contain;
  margin: 10px;
  width: 100%;
  height: ${({ itemHeight }) => itemHeight};
  transition: transform 450ms;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      cursor: pointer;
      transform: scale(1.09);
    }
  }
`;

const SImg = styled.img`
  width: auto;
  height: 100%;
  border: none;
  vertical-align: bottom;
`;
