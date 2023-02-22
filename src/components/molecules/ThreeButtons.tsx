/** 外部import */
import { FC } from 'react';
import styled from 'styled-components';

/** 内部import */
import { Button } from '../atoms';

type Props = {
  btnName1: string;
  btnName2: string;
  btnName3: string;
  onClick1: () => void;
  onClick2: () => void;
  onClick3: () => void;
};

export const ThreeButtons: FC<Props> = (props) => {
  const { btnName1, btnName2, btnName3, onClick1, onClick2, onClick3 } = props;

  return (
    <SButtonsWrapper>
      <Button onClick={onClick1}>{btnName1}</Button>
      <Button onClick={onClick2}>{btnName2}</Button>
      <Button onClick={onClick3}>{btnName3}</Button>
    </SButtonsWrapper>
  );
};

/** style */
const SButtonsWrapper = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 360px;

  @media (min-width: 768px) {
    margin-top: 32px;
    justify-content: flex-start;
    max-width: 100%;
  }
`;
