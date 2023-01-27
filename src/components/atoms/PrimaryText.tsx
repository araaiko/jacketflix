/** 外部import */
import { FC, ReactNode } from 'react';
import styled from 'styled-components';

type Props = {
  children: ReactNode;
};

export const PrimaryText: FC<Props> = ({ children }) => {
  return <SText>{children}</SText>;
};

/** style */
const SText = styled.p`
  line-height: 1.3;
`;
