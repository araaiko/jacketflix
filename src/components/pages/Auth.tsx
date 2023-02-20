/** 外部import */
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { FC, useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

/** 内部import */
import { auth, db } from '../../firebase';
import { UserContext } from '../../providers/UserProvider';
import { User } from '../../types/Context/user';

export const Auth: FC = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const isSignedIn = user.isSignedIn;

  useEffect(() => {
    if (!isSignedIn) {
      onAuthStateChanged(auth, (user) => {
        // != でnullとundefinedの両方をチェックできる
        if (user != null) {
          // userがサインインしている(認証されている)場合、データベースからuser情報を取得し、contextのuserを更新する
          // 利用可能なプロパティの一覧はdocsを参照
          // https://firebase.google.com/docs/reference/js/firebase.User

          const uid = user.uid;

          void getDoc(doc(db, 'users', uid)).then((snapshot) => {
            const data = snapshot.data() as User;

            setUser({
              isSignedIn: true,
              role: data.role,
              uid,
              username: data.username,
            });
          });
        } else {
          // userがサインアウトしている(=nullが返された)場合、サインインページを表示
          navigate('/signin');
        }
      });
    }
  }, []);

  if (!isSignedIn) {
    return <></>;
  } else {
    return <Outlet />;
  }
};
