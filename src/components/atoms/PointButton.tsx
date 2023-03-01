/** 外部import */
import { FC, ReactNode } from 'react';
import styled from 'styled-components';

/** 内部import */
import { colorVariables as c } from '../../style';

type Props = {
  children: ReactNode;
  onClick: () => void;
};

export const PointButton: FC<Props> = ({ children, onClick }) => {
  return <SButton onClick={onClick}>{children}</SButton>;
};

/** style */
const SButton = styled.button`
  cursor: pointer;
  color: ${c.primary};
  font-weight: bold;
  background-color: ${c.point};
  padding: 16px 14px;
  border-radius: 8px;
  transition: all 0.3s ease;
  width: 100%;
  /* min-width: 164px; */

  &:hover {
    color: #000;
    background-color: ${c.secondary};
  }

  @media (min-width: 768px) {
    padding: 16px 32px;

    &:nth-child(n + 2) {
      margin-left: 24px;
    }
  }
`;
