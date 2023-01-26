/** 外部import */
import { FC, ReactNode } from 'react';
import styled from 'styled-components';

type Props = {
  children: ReactNode;
};

export const ScrollHint: FC<Props> = ({ children }) => {
  return <SScrollText>{children}</SScrollText>;
};

/** style */
const SScrollText = styled.p`
  text-align: right;
  font-weight: bold;
  font-size: 20px;
  margin: 0;
  margin-right: 10px;
`;
