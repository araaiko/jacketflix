/** 外部import */
import { FC } from 'react';

/** 内部import */
import type { MovieInfo } from '../../types/api/fetchData';
import { ItemList, ScrollHint } from '../atoms';

type Props = {
  movies: MovieInfo[];
  itemHeight: string;
};

export const SideScrollItems: FC<Props> = (props) => {
  const { movies, itemHeight } = props;

  return (
    <>
      <ScrollHint>scroll ▶︎</ScrollHint>
      <ItemList movies={movies} itemHeight={itemHeight} />
    </>
  );
};
