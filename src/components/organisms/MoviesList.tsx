/** 外部import */
import { FC } from 'react';
import styled from 'styled-components';

/** 内部import */
import type { MovieInfo } from '../../types/api/fetchData';
import { CategoryTitle } from '../atoms';
import { SideScrollItems } from '../molecules';

type Props = {
  data: MovieInfo[];
  title: string;
  mediaType: string;
};

export const MoviesList: FC<Props> = (props) => {
  const { data, title, mediaType } = props;

  return (
    <SWrapper>
      <CategoryTitle>{title}</CategoryTitle>
      <SideScrollItems movies={data} mediaType={mediaType} itemHeight={'250px'} />
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
