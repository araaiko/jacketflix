/** 外部import */
import { FC, memo } from 'react';
import styled from 'styled-components';

/** 内部import */
import type { MovieInfo } from '../../types/api/fetchData';
import { H2Title, ItemList, Loading, ScrollHint } from '../atoms';

type Props = {
  data: MovieInfo[];
  title: string;
  mediaType: string;
  isLoading: boolean;
};

export const MoviesList: FC<Props> = memo((props) => {
  const { data, title, mediaType, isLoading } = props;

  return (
    <SBody>
      <H2Title fontSize={'24px'}>{title}</H2Title>
      <SScrollHintWrapper>
        <ScrollHint>scroll ▶︎</ScrollHint>
      </SScrollHintWrapper>
      {isLoading ? <Loading /> : <ItemList movies={data} mediaType={mediaType} itemHeight={'250px'} />}
    </SBody>
  );
});

MoviesList.displayName = 'MoviesList';

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
