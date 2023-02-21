/** 外部import */
import { collection, getDocs } from 'firebase/firestore';
import { FC, useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

/** 内部import */
import type { MyListInfo } from '../../types/dataAndState/dataAndState';
import { db } from '../../firebase';
import { UserContext } from '../../providers/UserProvider';
import { Header } from '../organisms';

export const MyListScreen: FC = () => {
  const { user } = useContext(UserContext);
  const uid = user.uid;
  const [myList, setMyList] = useState<MyListInfo[]>([]);
  
  const refFirstRef = useRef(true);

  useEffect(() => {
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
    void getDocs(collection(db, 'users', uid, 'my_list')).then((snapshots) => {
      snapshots.forEach((snapshot) => {
        const data = snapshot.data() as MyListInfo;
        setMyList((prevState) => [...prevState, data]);
      });
    });
    // }

    // return () => {
    //   oneTimeMountEffect = true;
    // };
  }, []);

  console.log(myList);

  return (
    <SBody>
      <Header />
      <h2>MyList</h2>
      {myList.length !== 0 ? <p>あるよ！！</p> : <p>myListに登録されている作品はありません。</p>}
    </SBody>
  );
};

/** style */
const SBody = styled.div`
  width: 100%;
  min-height: 100vh;
  height: auto;
  padding-top: 100px;
  padding-bottom: 80px;

  @media (min-width: 768px) {
    padding-bottom: 120px;
  }
`;
