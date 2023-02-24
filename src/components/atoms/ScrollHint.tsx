/** 外部import */
import { FC, ReactNode } from 'react';
import styled from 'styled-components';

/** 内部import */
import { colorVariables as c } from '../../style';

/** types */
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
  color: ${c.point};
  margin: 0;
`;
