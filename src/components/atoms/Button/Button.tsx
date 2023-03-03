/** 外部import */
import { FC, ReactNode } from 'react';
import styled from 'styled-components';

/** 内部import */
import { colorVariables as c } from '../../../style';

/** types */
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
  color: ${c.secondary};
  font-weight: bold;
  background-color: ${c.gradient51};
  padding: 16px 14px;
  border-radius: 8px;
  transition: all 0.3s ease;
  min-width: 164px;
  width: 100%;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      color: ${c.primary};
      background-color: ${c.hover};
    }
  }

  &:disabled {
    color: ${c.primary};
    background-color: ${c.hover};
    cursor: auto;
  }

  @media (min-width: 768px) {
    padding: 16px 32px;
  }
`;
