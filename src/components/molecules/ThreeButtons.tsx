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
      <SButtonWrapper>
        <Button onClick={onClick1}>{btnName1}</Button>
      </SButtonWrapper>
      <SButtonWrapper>
        <Button onClick={onClick2}>{btnName2}</Button>
      </SButtonWrapper>
      <SButtonWrapper>
        <Button onClick={onClick3}>{btnName3}</Button>
      </SButtonWrapper>
    </SButtonsWrapper>
  );
};

/** style */
const SButtonsWrapper = styled.div`
  margin-top: 16px;
  width: 100%;

  @media (min-width: 768px) {
    margin-top: 32px;
  }
`;

const SButtonWrapper = styled.div`
  &:not(:first-child) {
    margin-top: 24px;
  }
`
