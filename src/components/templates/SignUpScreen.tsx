/** 外部import */
import { ChangeEvent, FC, useCallback, useState, useContext } from 'react';
import styled from 'styled-components';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

/** 内部import */
import { auth, db, FirebaseTimestamp } from '../../firebase/index';
import { OnePointButton } from '../molecules';
import { colorVariables as c } from '../../style';
import { isValidEmailFormat, isValidRequiredInput } from '../../lib';
import { UserContext } from '../../providers/UserProvider';

/** types */
type SignUpParams = (username: string, email: string, password: string, confirmPassword: string) => void;

export const SignUpScreen: FC = () => {
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
          case 'invalid-email':
            alert('メールアドレスが有効ではありません。');
            setBtnName('アカウントを登録する');
            break;
          case 'weak-password':
            alert('パスワードが強くありません。');
            setBtnName('アカウントを登録する');
            break;
        }
      });
  };

  return (
    <SBody>
      <SInfoWrapper>
        <SLogo>JACKETFLIX</SLogo>
        <STitleWrapper>
          <STitle>アカウント登録</STitle>
        </STitleWrapper>

        <SFormWrapper>
          {/* ユーザー名 */}
          <SInputField>
            <SLabelWrapper>
              <SLabel htmlFor={'username'}>ユーザー名</SLabel>
            </SLabelWrapper>
            <SInputWrapper>
              <SInput type={'text'} id={'username'} value={username} onChange={inputUsername} />
            </SInputWrapper>
          </SInputField>

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

          {/* パスワード（再確認） */}
          <SInputField>
            <SLabelWrapper>
              <SLabel htmlFor={'confirmPassword'}>パスワード（再確認）</SLabel>
            </SLabelWrapper>
            <SInputWrapper>
              <SInput
                type={'password'}
                id={'confirmPassword'}
                value={confirmPassword}
                onChange={inputConfirmPassword}
              />
            </SInputWrapper>
          </SInputField>
        </SFormWrapper>

        {/* 登録ボタン */}
        <OnePointButton
          btnName={btnName}
          onClick={() => {
            onClickToSignUp(username, email, password, confirmPassword);
          }}
        />
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
  margin-top: 24px;
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
