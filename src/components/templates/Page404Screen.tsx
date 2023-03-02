/** 外部import */
import { FC } from 'react';
import styled from 'styled-components';

/** 内部import */
import { H2Title, PointButton, PrimaryText } from '../atoms';
import { Header } from '../organisms';

/** types */
type Props = {
  userName: string;
  title: string;
  text1: string;
  text2: string;
  btnText: string;
  onClick: () => void;
};

export const Page404Screen: FC<Props> = (props) => {
  const { userName, title, text1, text2, btnText, onClick } = props;

  return (
    <SBody>
      <Header userName={userName} />
      <div>
        <STitleWrapper>
          <H2Title fontSize={'clamp(32px, 5vw, 40px)'}>{title}</H2Title>
        </STitleWrapper>
        <STextBox>
          <STextWrapper>
            <PrimaryText>{text1}</PrimaryText>
          </STextWrapper>
          <STextWrapper>
            <PrimaryText>{text2}</PrimaryText>
          </STextWrapper>
        </STextBox>
        <SButtonWrapper>
          <PointButton onClick={onClick}>{btnText}</PointButton>
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
