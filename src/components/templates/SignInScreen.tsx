/** 外部import */
import { ChangeEvent, FC, useCallback, useState, useContext } from 'react';
import styled from 'styled-components';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';

/** 内部import */
import type { User } from '../../types/Context/user';
import { auth, db } from '../../firebase/index';
import { AuthButton } from '../organisms';
import { colorVariables as c } from '../../style';
import { isValidEmailFormat, isValidRequiredInput } from '../../lib';
import { UserContext } from '../../providers/UserProvider';

/** types */
type SignInParams = (email: string, password: string) => void;

export const SignInScreen: FC = () => {
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
    <SBody>
      <SInfoWrapper>
        <SLogo>JACKETFLIX</SLogo>
        <STitleWrapper>
          <STitle>サインイン</STitle>
        </STitleWrapper>

        <SFormWrapper>
          {/* メールアドレス */}
          <SInputField>
            <SLabelWrapper>
              <SLabel htmlFor={'email'}>メールアドレス</SLabel>
            </SLabelWrapper>
            <SInputWrapper>
              <SInput type={'email'} id={'email'} value={email} onChange={inputEmail} />
            </SInputWrapper>
          </SInputField>

          {/* パスワード */}
          <SInputField>
            <SLabelWrapper>
              <SLabel htmlFor={'password'}>
                パスワード <span>※6文字以上</span>
              </SLabel>
            </SLabelWrapper>
            <SInputWrapper>
              <SInput type={'password'} id={'password'} value={password} onChange={inputPassword} />
            </SInputWrapper>
          </SInputField>
        </SFormWrapper>

        {/* サインインボタン */}
        <AuthButton
          btnName={btnName}
          onClick={() => {
            onClickToSignIn(email, password);
          }}
        />

        {/* 各種ページリンク */}
        <SLinkWrapper>
          <SLink to={'/signup'}>アカウントをお持ちでない方はこちら</SLink>
        </SLinkWrapper>
        <SLinkWrapper>
          <SLink to={'/signin/reset'}>パスワードを忘れた方はこちら</SLink>
        </SLinkWrapper>
      </SInfoWrapper>
    </SBody>
  );
};

/** style */
const SBody = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 40px;
  padding-bottom: 40px;
`;

const SInfoWrapper = styled.div`
  padding-left: 16px;
  padding-right: 16px;
  width: 100%;
  max-width: 600px;
  text-align: center;
`;

const SLogo = styled.h1`
  font-size: clamp(40px, 7.5vw, 56px);
  font-weight: bold;
  color: ${c.point};
`;

const STitleWrapper = styled.div`
  margin-top: 16px;

  @media (min-width: 768px) {
    margin-top: 24px;
  }

  @media (min-width: 1024px) {
    margin-top: 32px;
  }
`;

const STitle = styled.h2`
  font-size: clamp(24px, 4.5vw, 32px);
  font-weight: bold;
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

const SLabelWrapper = styled.dt`
  width: 100%;
  margin-top: 0;
  text-align: left;
`;

const SLabel = styled.label`
  font-weight: bold;
  font-size: 16px;

  span {
    font-size: 12px;
    color: ${c.point};
  }

  @media (min-width: 768px) {
    font-size: 18px;
  }
`;

const SInputWrapper = styled.dd`
  width: 100%;
  margin-top: 8px;
`;

const SInput = styled.input`
  font-family: inherit;
  font-weight: normal;
  width: 100%;
  height: 48px;
  padding-left: 14px;
  padding-right: 14px;
  border-radius: 8px;
  color: #000;
  appearance: none;
  background-color: #fff;
  font-size: 16px;

  @media (min-width: 768px) {
    font-size: 18px;
  }

  &:hover {
    outline: none;
    border: 3px solid ${c.point};
    border-radius: 8px;
  }

  &:focus {
    outline: none;
    border: 3px solid ${c.point};
    border-radius: 8px;
  }

  &:focus-visible {
    outline: none;
    border: 3px solid ${c.point};
    border-radius: 8px;
  }
`;

const SLinkWrapper = styled.p`
  margin-top: 32px;
`;

const SLink = styled(Link)`
  color: ${c.secondary};
  text-decoration: underline;

  &:hover {
    text-decoration: none;
  }
`;
