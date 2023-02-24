/** 外部import */
import { FC } from 'react';
import styled from 'styled-components';

/** 内部import */
import type { MovieInfo } from '../../types/api/fetchData';
import { CategoryTitle, ItemList, ScrollHint } from '../atoms';

type Props = {
  data: MovieInfo[];
  title: string;
  mediaType: string;
};

export const MoviesList: FC<Props> = (props) => {
  const { data, title, mediaType } = props;

  return (
    <SBody>
      <CategoryTitle>{title}</CategoryTitle>
      <SScrollHintWrapper>
        <ScrollHint>scroll ▶︎</ScrollHint>
      </SScrollHintWrapper>
      <ItemList movies={data} mediaType={mediaType} itemHeight={'250px'} />
    </SBody>
  );
};

/** style */
const SBody = styled.div`
  margin-left: 20px;
  position: relative;

  &:nth-child(n + 2) {
    margin-top: 50px;
  }
`;

const SScrollHintWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;
