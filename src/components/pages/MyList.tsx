/** 外部import */
import { collection, getDocs } from 'firebase/firestore';
import { FC, startTransition, useContext, useEffect, useState } from 'react';

/** 内部import */
import type { MyListInfo } from '../../types/dataAndState/dataAndState';
import { db } from '../../firebase';
import { UserContext } from '../../providers/UserProvider';
import { MyListScreen } from '../templates';

export const MyList: FC = () => {
  const { user } = useContext(UserContext);
  const uid = user.uid;
  const [myList, setMyList] = useState<MyListInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // React.StrictModeによる再レンダリングの回避用
  let oneTimeMountEffect = false;

  useEffect(() => {
    // React.StrictModeによる再レンダリングの回避
    if (!oneTimeMountEffect) {
      // if (myList.length === 0){}：開発時に、再レンダリングが起こるたびに処理が走り、配列の値が重複するのを防ぐ
      if (myList.length === 0) {
        void getDocs(collection(db, 'users', uid, 'myList')).then((snapshots) => {
          snapshots.forEach((snapshot) => {
            const data = snapshot.data() as MyListInfo;
            startTransition(() => {
              setMyList((prevState) => [...prevState, data]);
            });
          });
          setIsLoading(false);
        });
      }
    }

    return () => {
      oneTimeMountEffect = true;
    };
  }, []);

  return <MyListScreen userName={user.username} myList={myList} setMyList={setMyList} isLoading={isLoading} />;
};
