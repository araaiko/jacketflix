/** 外部import */
import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

/** 内部import */
import { colorVariables as c } from '../../../style';

/** types */
type Props = {
  children: ReactNode;
};

export const LogoWithLink: FC<Props> = ({ children }) => {
  return (
    <SLogo>
      <SLogoLink to={'/'}>{children}</SLogoLink>
    </SLogo>
  );
};

/** style */
const SLogo = styled.h1`
  font-size: clamp(24px, 4.2vw, 32px);
  color: ${c.point};

  /* @media (min-width: 768px) {
    font-size: 32px;
  } */
`;

const SLogoLink = styled(Link)`
  color: ${c.point};
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.7;
  }
`;
