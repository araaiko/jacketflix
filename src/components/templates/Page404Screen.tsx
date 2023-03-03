/** 外部import */
import { FC } from 'react';
import styled from 'styled-components';

/** 内部import */
import { Contents404, Header } from '../organisms';

/** types */
type Props = {
  userName: string;
};

export const Page404Screen: FC<Props> = (props) => {
  const { userName } = props;

  return (
    <SBody>
      <Header userName={userName} />
      <Contents404 />
    </SBody>
  );
};

/** style */
const SBody = styled.div`
  width: 100%;
  min-height: 100vh;
  height: auto;
  padding-top: 100px;
  padding-bottom: 120px;
  padding-left: 16px;
  padding-right: 16px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: 640px) {
    padding-top: 120px;
  }
`;