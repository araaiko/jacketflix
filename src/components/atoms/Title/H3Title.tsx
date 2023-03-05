/** 外部import */
import { FC, ReactNode } from 'react';
import styled from 'styled-components';

type Props = {
  children: ReactNode;
  fontSize: string;
};

export const H3Title: FC<Props> = (props) => {
  const { children, fontSize } = props;
  return <STitle fz={fontSize}>{children}</STitle>;
};

/** style */
type STitleProps = {
  fz: string;
};

const STitle = styled.h3<STitleProps>`
  font-weight: bold;
  font-size: ${({ fz }) => fz};
`;
