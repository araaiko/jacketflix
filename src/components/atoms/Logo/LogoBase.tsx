/** 外部import */
import { FC, ReactNode } from 'react';
import styled from 'styled-components';

/** 内部import */
import { colorVariables as c } from '../../../style';

/** types */
type Props = {
  children: ReactNode;
};

export const LogoBase: FC<Props> = ({ children }) => {
  return <SLogo>{children}</SLogo>;
};

/** style */
const SLogo = styled.h1`
  font-size: clamp(24px, 4.2vw, 32px);
  color: ${c.point};

  /* @media (min-width: 768px) {
    font-size: 32px;
  } */
`;
