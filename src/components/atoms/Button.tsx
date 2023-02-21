/** 外部import */
import { FC, ReactNode } from 'react';
import styled from 'styled-components';

type Props = {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
};

export const Button: FC<Props> = (props) => {
  const { children, onClick, disabled = false } = props;
  return (
    <SButton onClick={onClick} disabled={disabled}>
      {children}
    </SButton>
  );
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

  &:hover,
  &:disabled {
    color: #000;
    background-color: #e6e6e6;
  }

  &:disabled {
    cursor: auto;
  }

  @media (min-width: 768px) {
    padding: 16px 32px;

    &:nth-child(n + 2) {
      margin-left: 24px;
    }
  }
`;
