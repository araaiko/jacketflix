/** 外部import */
import { FC, ReactNode } from 'react';
import styled from 'styled-components';

/** 内部import */
import { colorVariables as c } from '../../../style';

/** types */
type Props = {
  children: ReactNode;
};

export const LogoBig: FC<Props> = ({ children }) => {
  return <SLogo>{children}</SLogo>;
};

/** style */
const SLogo = styled.h1`
  font-size: clamp(40px, 7.5vw, 56px);
  font-weight: bold;
  color: ${c.point};
`;
