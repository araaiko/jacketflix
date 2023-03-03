/** 外部import */
import { deleteDoc, doc } from 'firebase/firestore';
import { FC, memo, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

/** 内部import */
import type { MyListInfo } from '../../types/dataAndState/dataAndState';
import { db } from '../../firebase';
import { onClickToNetflix, onClickToWorkInfo } from '../../function/commonOnClick';
import { UserContext } from '../../providers/UserProvider';
import { Img, H3Title, H2Title, PrimaryText } from '../atoms';
import { ThreeButtons } from '../molecules';

/** types */
type Props = {
  myList: MyListInfo[];
  setMyList: React.Dispatch<MyListInfo[]>;
};

export const MyListItems: FC<Props> = memo((props) => {
  const { myList, setMyList } = props;
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const uid = user.uid;

  // JSX内 作品タイトル関連にセットするテキスト
  const checkTitle = (item: MyListInfo): string => {
    if (item.title !== '') {
      return item.title;
    } else if (item.name !== '') {
      return item.name;
    } else if (item.original_name !== '') {
      return item.original_name;
    } else {
      return '';
    }
  };

  // MyList登録解除
  /**
   * 備忘録：関数を親コンポーネントからpropsで受け取り、引数は子コンポーネントで渡すやり方があるみたい。
   * ただ、上記 × TypeScript × Promiseの場合の書き方がよく分からずエラー解消できなかったため、現状は未実施。
   */
  const onClickToRemoveMyList = async (myListId: string): Promise<void> => {
    await deleteDoc(doc(db, 'users', uid, 'myList', myListId));

    setMyList(myList.filter((item) => item.my_list_id !== myListId));
  };

  return (
    <>
      <STitleWrapper>
        <H2Title fontSize={'40px'}>MyList</H2Title>
      </STitleWrapper>
      <SItemsWrapper>
        {myList.length !== 0 ? (
          <SItems>
            {myList.map((item, i) => (
              <SItem key={i}>
                <SInfoWrapper>
                  <SItemTitleWrapper>
                    <H3Title fontSize={'32px'}>{checkTitle(item)}</H3Title>
                  </SItemTitleWrapper>
                  <ThreeButtons
                    btnName1={'作品情報を見る'}
                    btnName2={'Netflixで視聴する'}
                    btnName3={'MyListから外す'}
                    onClick1={() => {
                      onClickToWorkInfo(item.id, item.media_type, navigate);
                    }}
                    onClick2={onClickToNetflix}
                    onClick3={() => {
                      void onClickToRemoveMyList(item.my_list_id);
                    }}
                  />
                </SInfoWrapper>
                <SImgWrapper>
                  <Img src={`https://image.tmdb.org/t/p/original/${item.poster_path ?? ''}`} alt={checkTitle(item)} />
                </SImgWrapper>
              </SItem>
            ))}
          </SItems>
        ) : (
          <STextWrapper>
            <PrimaryText>myListに登録されている作品はありません。</PrimaryText>
          </STextWrapper>
        )}
      </SItemsWrapper>
    </>
  );
});

MyListItems.displayName = 'MyListItems';

/** style */
const STitleWrapper = styled.div`
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

const SItems = styled.ul`
  margin-top: 24px;
  width: 100%;
  max-width: 360px;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 640px) {
    margin-top: 72px;
    max-width: 800px;
  }
`;

const SItem = styled.li`
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  gap: 16px;

  &:not(:first-child) {
    margin-top: 64px;
  }

  @media (min-width: 640px) {
    flex-direction: row;
    gap: 40px;
  }
`;

const SInfoWrapper = styled.div`
  width: 100%;

  @media (min-width: 640px) {
    width: calc(50% - 40px / 2);
  }
`;

const SImgWrapper = styled.div`
  width: 100%;

  @media (min-width: 640px) {
    width: calc(50% - 40px / 2);
  }
`;

const SItemTitleWrapper = styled.div`
  @media (min-width: 640px) {
    margin-top: 5%;
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
