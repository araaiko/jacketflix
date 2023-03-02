/** 外部import */
import { FC } from 'react';
import styled from 'styled-components';

/** 内部import */
import { PointButton } from '../atoms';

type Props = {
  btnName: string;
  onClick: () => void;
};

export const AuthButton: FC<Props> = (props) => {
  const { btnName, onClick } = props;

  return (
    <SButtonWrapper>
      <PointButton onClick={onClick}>{btnName}</PointButton>
    </SButtonWrapper>
  );
};

/** style */
const SButtonWrapper = styled.div`
  margin-top: 48px;
  width: 100%;
  max-width: 250px;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 768px) {
    margin-top: 64px;
  }
`;
