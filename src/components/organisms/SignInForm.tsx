/** 外部import */
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { ChangeEvent, FC, useCallback, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

/** 内部import */
import type { User } from '../../types/Context/user';
import { auth, db } from '../../firebase';
import { isValidEmailFormat, isValidRequiredInput } from '../../lib';
import { UserContext } from '../../providers/UserProvider';
import { H2Title, Input, TextLink } from '../atoms';
import { AuthButton } from '../molecules';

/** types */
type SignInParams = (email: string, password: string) => void;

export const SignInForm: FC = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [btnName, setBtnName] = useState('サインイン');

  // 入力値の更新
  const inputEmail = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    },
    [setEmail]
  );
  const inputPassword = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    },
    [setPassword]
  );

  // アカウント登録
  const onClickToSignIn: SignInParams = (email, password) => {
    // バリデーション
    if (!isValidRequiredInput(email, password)) {
      alert('全て入力してください');
      return false;
    }

    if (!isValidEmailFormat(email)) {
      alert('メールアドレスの形式が不正です。もう1度お試しください。');
      return false;
    }

    if (password.length < 6) {
      alert('パスワードは6文字以上で入力してください。');
      return false;
    }

    setBtnName('確認中...');
    // firebase アカウント登録
    void signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        // 新しいアカウントが作成されるので、定数userに格納
        const user = result.user;

        // != でnullとundefinedの両方をチェックできる
        if (user != null) {
          const uid = user.uid;

          // firebase アカウントデータ取得とcontextのstate更新
          // doc(db, collection名, id)
          void getDoc(doc(db, 'users', uid)).then((snapshot) => {
            const data = snapshot.data() as User;

            setUser({
              isSignedIn: true,
              role: data.role,
              uid,
              username: data.username,
            });
            navigate('/');
          });
        }
      })
      .catch((e: { code: string }) => {
        switch (e.code) {
          case 'auth/invalid-email':
            alert('メールアドレスが有効ではありません。');
            setBtnName('サインイン');
            break;
          case 'auth/user-disabled':
            alert('アカウントが存在しません。');
            setBtnName('サインイン');
            break;
          case 'auth/user-not-found':
            alert('アカウントが存在しません。');
            setBtnName('サインイン');
            break;
          case 'auth/wrong-password':
            alert('パスワードが間違っています。');
            setBtnName('サインイン');
            break;
          case 'auth/too-many-requests':
            alert(
              'パスワードを複数回間違われたため、一時的にアカウントをロックしました。\r\n恐れ入りますが時間をあけてから再度お試しください。'
            );
            setBtnName('サインイン');
            break;
        }
      });
  };

  return (
    <>
      <STitleWrapper>
        <H2Title fontSize={'clamp(24px, 4.5vw, 32px)'}>サインイン</H2Title>
      </STitleWrapper>

      <SFormWrapper>
        {/* メールアドレス */}
        <SInputField>
          <Input
            label={'メールアドレス'}
            htmlFor={'email'}
            value={email}
            onChange={inputEmail}
            type={'email'}
            id={'email'}
          />
        </SInputField>

        {/* パスワード */}
        <SInputField>
          <Input
            label={['パスワード', <span key={'spanKey'}>※6文字以上</span>]}
            htmlFor={'password'}
            value={password}
            onChange={inputPassword}
            type={'password'}
            id={'password'}
          />
        </SInputField>

        {/* サインインボタン */}
        <AuthButton
          btnName={btnName}
          onClick={() => {
            onClickToSignIn(email, password);
          }}
        />

        {/* 各種ページリンク */}
        <SLinkWrapper>
          <TextLink link={'/signup'}>アカウントをお持ちでない方はこちら</TextLink>
        </SLinkWrapper>
        <SLinkWrapper>
          <TextLink link={'/signin/reset'}>パスワードを忘れた方はこちら</TextLink>
        </SLinkWrapper>
      </SFormWrapper>
    </>
  );
};

/** style */
const STitleWrapper = styled.div`
  margin-top: 16px;

  @media (min-width: 768px) {
    margin-top: 24px;
  }

  @media (min-width: 1024px) {
    margin-top: 32px;
  }
`;

const SFormWrapper = styled.div`
  margin-top: 40px;
`;

const SInputField = styled.div`
  margin-top: 16px;

  @media (min-width: 768px) {
    margin-top: 24px;
  }
`;

const SLinkWrapper = styled.p`
  margin-top: 32px;
`;
