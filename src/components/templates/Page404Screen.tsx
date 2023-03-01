/** 外部import */
import { FC, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from '../../providers/UserProvider';
import { PointButton, PrimaryText } from '../atoms';
import { Header } from '../organisms';

export const Page404Screen: FC = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const onClickToTop = (): void => {
    navigate('/');
  };

  return (
    <SBody>
      <Header userName={user.username} />
      <div>
        <SPageTitle>お探しのページが見つかりません</SPageTitle>
        <STextBox>
          <STextWrapper>
            <PrimaryText>
              アクセスしようとしたページは削除、変更されたか、現在利用できない可能性があります。
            </PrimaryText>
          </STextWrapper>
          <STextWrapper>
            <PrimaryText>
              恐れ入りますが、以下からトップページへ戻り、改めてお探しいただきますようお願いいたします。
            </PrimaryText>
          </STextWrapper>
        </STextBox>
        <SButtonWrapper>
          <PointButton onClick={onClickToTop}>トップページへ戻る</PointButton>
        </SButtonWrapper>
      </div>
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
  padding-left: 16px;
  padding-right: 16px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: 640px) {
    padding-top: 120px;
  }
`;

// const SInfoWrapper = styled.div``;

const SPageTitle = styled.h2`
  text-align: center;
  font-weight: bold;
  font-size: clamp(32px, 5vw, 40px);
`;

const STextBox = styled.div`
  margin-top: 56px;
`;

const STextWrapper = styled.div`
  text-align: center;

  &:not(:first-child) {
    margin-top: 24px;

    @media (min-width: 640px) {
      margin-top: 0;
    }
  }
`;

const SButtonWrapper = styled.div`
  width: 100%;
  max-width: 250px;
  margin-top: 40px;
  margin-left: auto;
  margin-right: auto;
`;
