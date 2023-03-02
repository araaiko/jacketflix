/** 外部import */
import { FC, memo, ReactNode } from 'react';
import styled from 'styled-components';

type Props = {
  children: ReactNode;
  fontSize: string;
};

export const H2Title: FC<Props> = memo((props) => {
  const { children, fontSize } = props;
  return <STitle fz={fontSize}>{children}</STitle>;
});

H2Title.displayName = 'H2Title';

/** style */
type STitleProps = {
  fz: string;
};

const STitle = styled.h2<STitleProps>`
  font-weight: bold;
  font-size: ${({ fz }) => fz};
`;
