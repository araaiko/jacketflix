/** 外部import */
import { ChangeEvent, FC, useCallback, useState } from 'react';
import styled from 'styled-components';
import { sendPasswordResetEmail } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

/** 内部import */
import { auth } from '../../firebase/index';
import { AuthButton } from '../molecules';
import { colorVariables as c } from '../../style';
import { isValidEmailFormat, isValidRequiredInput } from '../../lib';

/** types */
type ResetParams = (email: string) => void;

export const ResetScreen: FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [btnName, setBtnName] = useState('リセットする');

  // 入力値の更新
  const inputEmail = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    },
    [setEmail]
  );

  // アカウント登録
  const onClickToReset: ResetParams = (email) => {
    // バリデーション
    if (!isValidRequiredInput(email)) {
      alert('全て入力してください');
      return false;
    }

    if (!isValidEmailFormat(email)) {
      alert('メールアドレスの形式が不正です。もう1度お試しください。');
      return false;
    }

    setBtnName('送信中...');
    // firebase アカウント登録
    void sendPasswordResetEmail(auth, email)
      .then(() => {
        alert('入力されたアドレス宛にパスワードリセット用のメールをお送りしました。');
        navigate('/signin');
      })
      .catch(() => {
        alert('パスワードリセットに失敗しました。通信環境をご確認のうえ、もう1度お試しください。');
      });
  };

  return (
    <SBody>
      <SInfoWrapper>
        <SLogo>JACKETFLIX</SLogo>
        <STitleWrapper>
          <STitle>パスワードリセット</STitle>
        </STitleWrapper>

        <SLead>
          メールアドレスを入力し、「リセットする」ボタンを押してください。
          <br />
          入力されたアドレス宛にパスワードリセット用のメールをお送りします。
        </SLead>

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

          {/* パスワードリセットボタン */}
          <AuthButton
            btnName={btnName}
            onClick={() => {
              onClickToReset(email);
            }}
          />

          {/* 各種ページリンク */}
          <SLinkWrapper>
            <SLink to={'/signin'}>サインインページに戻る</SLink>
          </SLinkWrapper>
        </SFormWrapper>
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

const SLead = styled.p`
  margin-top: 24px;
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
