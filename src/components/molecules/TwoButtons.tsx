/** 外部import */
import { FC } from 'react';
import styled from 'styled-components';

/** 内部import */
import { Button } from '../atoms/Button';

type Props = {
  btnName1: string;
  btnName2: string;
};

export const TwoButtons: FC<Props> = (props) => {
  const { btnName1, btnName2 } = props;

  return (
    <SButtonsWrapper>
      <Button>{btnName1}</Button>
      <Button>{btnName2}</Button>
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
