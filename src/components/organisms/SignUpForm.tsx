/** 外部import */
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { ChangeEvent, FC, useCallback, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

/** 内部import */
import { auth, db, FirebaseTimestamp } from '../../firebase';
import { isValidEmailFormat, isValidRequiredInput } from '../../lib';
import { UserContext } from '../../providers/UserProvider';
import { H2Title, Input, TextLink } from '../atoms';
import { AuthButton } from '../molecules';

/** types */
type SignUpParams = (username: string, email: string, password: string, confirmPassword: string) => void;

export const SignUpForm: FC = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [btnName, setBtnName] = useState('アカウントを登録する');

  // 入力値の更新
  const inputUsername = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setUsername(e.target.value);
    },
    [setUsername]
  );
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
  const inputConfirmPassword = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setConfirmPassword(e.target.value);
    },
    [setConfirmPassword]
  );

  // アカウント登録
  const onClickToSignUp: SignUpParams = (username, email, password, confirmPassword) => {
    // バリデーション
    if (!isValidRequiredInput(username, email, password, confirmPassword)) {
      alert('全て入力してください');
      return false;
    }

    if (!isValidEmailFormat(email)) {
      alert('メールアドレスの形式が不正です。もう1度お試しください。');
      return false;
    }

    if (password !== confirmPassword) {
      alert('パスワードが一致しません。もう1度お試しください。');
      return false;
    }

    if (password.length < 6) {
      alert('パスワードは6文字以上で入力してください。');
      return false;
    }

    setBtnName('登録中...');
    // firebase アカウント登録
    void createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        // 新しいアカウントが作成されるので、定数userに格納
        const user = result.user;

        // != でnullとundefinedの両方をチェックできる
        if (user != null) {
          const uid = user.uid;
          const timestamp = FirebaseTimestamp.now();

          const userInitialData = {
            created_at: timestamp,
            email,
            role: 'customer',
            uid,
            updated_at: timestamp,
            username,
          };

          // firebase collection登録とcontextのstate更新
          // doc(db, collection名, id)
          void setDoc(doc(db, 'users', uid), userInitialData).then(() => {
            setUser({ isSignedIn: true, role: 'customer', uid, username });
            navigate('/');
          });
        }
      })
      .catch((e: { code: string }) => {
        switch (e.code) {
          case 'auth/email-already-in-use':
            alert('このメールアドレスは既に使用されています。');
            setBtnName('アカウントを登録する');
            break;
          case 'auth/invalid-email':
            alert('メールアドレスが有効ではありません。');
            setBtnName('アカウントを登録する');
            break;
          case 'auth/weak-password':
            alert('パスワードが強くありません。');
            setBtnName('アカウントを登録する');
            break;
        }
      });
  };

  return (
    <>
      <STitleWrapper>
        <H2Title fontSize={'clamp(24px, 4.5vw, 32px)'}>アカウント登録</H2Title>
      </STitleWrapper>

      <SFormWrapper>
        {/* ユーザー名 */}
        <SInputField>
          <Input
            label={'ユーザー名'}
            htmlFor={'username'}
            value={username}
            onChange={inputUsername}
            type={'text'}
            id={'username'}
          />
        </SInputField>

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

        {/* パスワード（再確認） */}
        <SInputField>
          <Input
            label={'パスワード（再確認）'}
            htmlFor={'confirmPassword'}
            value={confirmPassword}
            onChange={inputConfirmPassword}
            type={'password'}
            id={'confirmPassword'}
          />
        </SInputField>

        {/* 登録ボタン */}
        <AuthButton
          btnName={btnName}
          onClick={() => {
            onClickToSignUp(username, email, password, confirmPassword);
          }}
        />

        <SLinkWrapper>
          <TextLink link={'/signin'}>アカウントをお持ちの方はこちら</TextLink>
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
  margin-top: 24px;
`;
