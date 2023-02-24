/** 外部import */
import { FC, ReactNode } from 'react';
import styled from 'styled-components';

/** types */
type Props = {
  children: ReactNode;
};

export const CategoryTitle: FC<Props> = ({ children }) => {
  return <STitle>{children}</STitle>;
};

/** style */
const STitle = styled.h2`
  font-weight: bold;
  font-size: 24px;
`;
