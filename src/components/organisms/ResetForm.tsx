/** 外部import */
import { sendPasswordResetEmail } from 'firebase/auth';
import { ChangeEvent, FC, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

/** 内部import */
import { auth } from '../../firebase';
import { isValidEmailFormat, isValidRequiredInput } from '../../lib';
import { Input, TextLink } from '../atoms';
import { AuthButton } from '../molecules';

/** types */
type ResetParams = (email: string) => void;

export const ResetForm: FC = () => {
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
        setBtnName('リセットする');
      });
  };

  return (
    <>
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

        {/* パスワードリセットボタン */}
        <AuthButton
          btnName={btnName}
          onClick={() => {
            onClickToReset(email);
          }}
        />
        {/* 各種ページリンク */}
        <SLinkWrapper>
          <TextLink link={'/signin'}>サインインページに戻る</TextLink>
        </SLinkWrapper>
      </SFormWrapper>
    </>
  );
};

/** style */
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
