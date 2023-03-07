/** 外部import */
import { FC } from 'react';
import styled from 'styled-components';

/** 内部import */
import LoadingSvg from '../../img/loading.svg';

export const Loading: FC = () => {
  return (
    <SImgWrapper>
      <img src={LoadingSvg} alt="loading..." />
    </SImgWrapper>
  );
};

/** style */
const SImgWrapper = styled.div`
  margin: 10px auto;
  width: clamp(32px, 5vw, 56px);
`;
