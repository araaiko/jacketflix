/** 外部import */
import { collection, getDocs } from 'firebase/firestore';
import { FC, useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

/** 内部import */
import type { MyListInfo } from '../../types/dataAndState/dataAndState';
import { db } from '../../firebase';
import { UserContext } from '../../providers/UserProvider';
import { Header } from '../organisms';
import { ThreeButtons } from '../molecules';
import { onClickToNetflix, onClickToWorkInfo } from '../../function/commonOnClick';

export const MyListScreen: FC = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const uid = user.uid;
  const [myList, setMyList] = useState<MyListInfo[]>([]);
  // React.StrictModeによる再レンダリングの回避用
  const refFirstRef = useRef(true);

  // JSX内 作品タイトル関連にセットするテキスト
  const itemTitle = (item: MyListInfo): string => {
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
  const onClickToRemoveMyList = (): void => {
    alert('後で実装しようね');
  };

  useEffect(() => {
    // React.StrictModeによる再レンダリングの回避
    // 開発モードの時だけ初回のレンダリングを実行しない
    if (process.env.NODE_ENV === 'development') {
      if (refFirstRef.current) {
        refFirstRef.current = false;
        return;
      }
    }

    // let oneTimeMountEffect = false;

    // if (!oneTimeMountEffect) {

    // もしonClickイベントでstate更新後にもuseEffect内の処理が走って配列の値が重複するようなら
    // if(myList.length === 0){}でgetDocsを囲ってみればいいのでは？
    // 配列が空である限りは、どれだけ処理が走っても値が重複することはないから
    // もしかしたらmemo化を進めたらif文なしでも大丈夫になるか。。。？
    if (myList.length === 0) {
      void getDocs(collection(db, 'users', uid, 'myList')).then((snapshots) => {
        snapshots.forEach((snapshot) => {
          const data = snapshot.data() as MyListInfo;
          setMyList((prevState) => [...prevState, data]);
        });
      });
    }
    // }

    // return () => {
    //   oneTimeMountEffect = true;
    // };
  }, []);

  console.log(myList);

  return (
    <SBody>
      <Header />
      <SPageTitle>MyList</SPageTitle>
      <SItemsWrapper>
        {myList.length !== 0 ? (
          <SItems>
            {myList.map((item, i) => (
              <SItem key={i}>
                <SInfoWrapper>
                  <SItemTitleWrapper>
                    <SItemTitle>{itemTitle(item)}</SItemTitle>
                  </SItemTitleWrapper>
                  <ThreeButtons
                    btnName1={'作品情報を見る'}
                    btnName2={'Netflixで視聴する'}
                    btnName3={'MyListから外す'}
                    onClick1={() => {
                      onClickToWorkInfo(item.id, item.media_type, navigate);
                    }}
                    onClick2={onClickToNetflix}
                    onClick3={onClickToRemoveMyList}
                  />
                </SInfoWrapper>
                <SImgWrapper>
                  <SImg src={`https://image.tmdb.org/t/p/original/${item.poster_path ?? ''}`} alt={itemTitle(item)} />
                </SImgWrapper>
              </SItem>
            ))}
          </SItems>
        ) : (
          <SText>myListに登録されている作品はありません。</SText>
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
    /* padding-bottom: 120px; */
  }
`;

const SPageTitle = styled.h2`
  text-align: center;
  font-weight: bold;
  font-size: 40px;
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
    /* align-self: center; */
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
const SItemTitle = styled.h3`
  font-weight: bold;
  font-size: 32px;
`;

const SImg = styled.img`
  width: 100%;
  height: auto;
`;

const SText = styled.p``;
