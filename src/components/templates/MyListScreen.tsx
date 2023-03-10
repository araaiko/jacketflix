/** 外部import */
import { FC, memo } from 'react';
import styled from 'styled-components';

/** 内部import */
import type { MyListInfo } from '../../types/dataAndState/dataAndState';
import { Header, MyListItems } from '../organisms';

/** types */
type Props = {
  userName: string;
  myList: MyListInfo[];
  setMyList: React.Dispatch<MyListInfo[]>;
  isLoading: boolean;
};

export const MyListScreen: FC<Props> = memo((props) => {
  const { userName, myList, setMyList, isLoading } = props;

  return (
    <SBody>
      <Header userName={userName} />
      <MyListItems myList={myList} setMyList={setMyList} isLoading={isLoading} />
    </SBody>
  );
});

MyListScreen.displayName = 'MyListScreen';

/** style */
const SBody = styled.div`
  width: 100%;
  min-height: 100vh;
  height: auto;
  padding-top: 100px;
  padding-bottom: 120px;

  @media (min-width: 640px) {
    padding-top: 120px;
  }
`;
