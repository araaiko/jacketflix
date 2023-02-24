/** 外部import */
import { FC, ReactNode } from 'react';
import styled from 'styled-components';

type Props = {
  children: ReactNode;
  onClick: () => void;
};

export const Button: FC<Props> = ({ children, onClick }) => {
  return <SButton onClick={onClick}>{children}</SButton>;
};

/** style */
const SButton = styled.button`
  cursor: pointer;
  color: #fff;
  font-weight: bold;
  background-color: rgba(51, 51, 51, 0.5);
  padding: 16px 14px;
  border-radius: 8px;
  transition: all 0.3s ease;
  min-width: 164px;

  &:hover {
    color: #000;
    background-color: #e6e6e6;
  }

  @media (min-width: 768px) {
    padding: 16px 32px;

    &:nth-child(n + 2) {
      margin-left: 24px;
    }
  }
`;
