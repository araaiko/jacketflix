/** 外部import */
import { FC, memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

/** 内部import */
import { H2Title, PointButton, PrimaryText } from '../atoms';

export const Contents404: FC = memo(() => {
  const navigate = useNavigate();

  const onClickToTop = useCallback((): void => {
    navigate('/');
  }, []);
  
  return (
    <div>
      <STitleWrapper>
        <H2Title fontSize={'clamp(32px, 5vw, 40px)'}>お探しのページが見つかりません</H2Title>
      </STitleWrapper>
      <STextBox>
        <STextWrapper>
          <PrimaryText>アクセスしようとしたページは削除、変更されたか、現在利用できない可能性があります。</PrimaryText>
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
  );
});

Contents404.displayName = 'Contents404';

/** style */
const STitleWrapper = styled.div`
  text-align: center;
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
