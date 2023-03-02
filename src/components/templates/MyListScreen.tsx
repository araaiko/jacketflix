/** 外部import */
import { FC } from 'react';
import styled from 'styled-components';

/** 内部import */
import type { MyListInfo } from '../../types/dataAndState/dataAndState';
import { Header, MyListItems } from '../organisms';
import { H2Title, PrimaryText } from '../atoms';

/** types */
type Props = {
  userName: string;
  pageTitle: string;
  noContentsText: string;
  myList: MyListInfo[];
  setMyList: React.Dispatch<MyListInfo[]>;
};

export const MyListScreen: FC<Props> = (props) => {
  const { userName, pageTitle, noContentsText, myList, setMyList } = props;

  console.log('配列', myList);

  return (
    <SBody>
      <Header userName={userName} />
      <TitleWrapper>
        <H2Title fontSize={'40px'}>{pageTitle}</H2Title>
      </TitleWrapper>
      {/* MyList一覧 */}
      <SItemsWrapper>
        {myList.length !== 0 ? (
          <MyListItems myList={myList} setMyList={setMyList} />
        ) : (
          <STextWrapper>
            <PrimaryText>{noContentsText}</PrimaryText>
          </STextWrapper>
        )}
      </SItemsWrapper>
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

  @media (min-width: 640px) {
    padding-top: 120px;
  }
`;

const TitleWrapper = styled.div`
  text-align: center;
`;

const SItemsWrapper = styled.div`
  padding-left: 16px;
  padding-right: 16px;

  @media (min-width: 640px) {
    padding-left: 24px;
    padding-right: 24px;
  }
`;

const STextWrapper = styled.div`
  height: calc(100vh - 100px - 120px - 52px);
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;

  @media (min-width: 640px) {
    height: calc(100vh - 120px - 120px - 52px);
  }
`;
