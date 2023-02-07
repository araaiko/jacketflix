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
};

export const TwoButtons: FC<Props> = (props) => {
  const { btnName1, btnName2, onClick1, onClick2 } = props;

  return (
    <SButtonsWrapper>
      <Button onClick={onClick1}>{btnName1}</Button>
      <Button onClick={onClick2}>{btnName2}</Button>
    </SButtonsWrapper>
  );
};

/** style */
const SButtonsWrapper = styled.div`
  margin-top: 24px;

  @media (min-width: 768px) {
    margin-top: 32px;
  }
`;
