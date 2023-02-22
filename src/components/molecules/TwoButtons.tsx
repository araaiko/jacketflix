/** 外部import */
import { FC } from 'react';
import styled from 'styled-components';

/** 内部import */
import { Button } from '../atoms';

type Props = {
  btnName1: string;
  btnName2: string;
  onClick1: () => void;
  onClick2: () => void;
  disabled1?: boolean;
};

export const TwoButtons: FC<Props> = (props) => {
  const { btnName1, btnName2, onClick1, onClick2, disabled1 = false } = props;

  return (
    <SButtonsWrapper>
      <SButtonWrapper>
        <Button onClick={onClick1} disabled={disabled1}>
          {btnName1}
        </Button>
      </SButtonWrapper>
      <SButtonWrapper>
        <Button onClick={onClick2}>{btnName2}</Button>
      </SButtonWrapper>
    </SButtonsWrapper>
  );
};

/** style */
const SButtonsWrapper = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
  width: 100%;

  @media (min-width: 768px) {
    margin-top: 32px;
    justify-content: flex-start;
  }
`;

const SButtonWrapper = styled.div`
  @media (min-width: 768px) {
    &:nth-child(n + 2) {
      margin-left: 24px;
    }
  }
`;
