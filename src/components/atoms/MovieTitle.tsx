/** 外部import */
import { FC, ReactNode } from 'react';
import styled from 'styled-components';

type Props = {
  children: ReactNode;
};

export const MovieTitle: FC<Props> = ({ children }) => {
  return <SMovieTitle>{children}</SMovieTitle>;
};

/** style */
const SMovieTitle = styled.h2`
  font-weight: bold;
  font-size: 32px;

  @media (min-width: 768px) {
    font-size: 48px;
  }
`;
