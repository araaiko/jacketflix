/** 外部import */
import { FC } from 'react';
import styled from 'styled-components';

/** 内部import */
import type { FetchDetailData } from '../../types/api/fetchData';
import type { BtnState } from '../../types/dataAndState/dataAndState';
import { onClickToNetflix } from '../../function/commonOnClick';
import { H2Title, Img, PrimaryText } from '../atoms';
import { TwoButtons } from '../molecules';

/** types */
type Props = {
  data: FetchDetailData;
  myListBtn: BtnState;
  onClick1: () => void;
};

export const TwoColumnInfo: FC<Props> = (props) => {
  const { data, myListBtn, onClick1 } = props;

  return (
    <SInfoItems>
      <SInfoImgWrapper>
        <Img
          src={`https://image.tmdb.org/t/p/original/${data?.backdrop_path ?? ''}`}
          alt={data?.title ?? data?.name ?? data?.original_name ?? ''}
        />
      </SInfoImgWrapper>
      <SInfoTextWrapper>
        <H2Title fontSize={'clamp(32px, 5.5vw, 48px)'}>
          {data?.title ?? data?.name ?? data?.original_name ?? ''}
        </H2Title>
        <STextWrapper>
          <PrimaryText>{data?.overview}</PrimaryText>
        </STextWrapper>
        <TwoButtons
          btnName1={myListBtn.text}
          onClick1={onClick1}
          disabled1={myListBtn.disabled}
          btnName2={'Netflixで視聴する'}
          onClick2={onClickToNetflix}
        />
      </SInfoTextWrapper>
    </SInfoItems>
  );
};

/** style */
const SInfoItems = styled.div`
  width: 100%;
  max-width: 100%;

  @media (min-width: 1024px) {
    display: flex;
    flex-direction: row-reverse;
  }
`;

const SInfoItem = styled.div`
  width: 100%;

  @media (min-width: 1024px) {
    width: 50%;
  }
`;

const SInfoImgWrapper = styled(SInfoItem)`
  height: 400px;
  position: relative;

  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(180deg, transparent, rgba(37, 37, 37, 0.1), #000);
  }

  @media (min-width: 1024px) {
    min-height: 650px;
    height: auto;
    width: 55%;

    &::before {
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background: linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.1), #000);
    }

    &::after {
      background: linear-gradient(90deg, #000, rgba(37, 37, 37, 0.1), transparent);
    }
  }
`;

const SInfoTextWrapper = styled(SInfoItem)`
  padding-top: 32px;
  padding-bottom: 32px;
  padding-left: 16px;
  padding-right: 16px;

  @media (min-width: 1024px) {
    padding-top: 96px;
    padding-bottom: 96px;
    padding-left: 32px;
    padding-right: 0;
    align-self: center;
    width: 45%;
  }
`;

const STextWrapper = styled.div`
  margin-top: 24px;
  width: 100%;
  max-width: 600px;

  @media (min-width: 768px) {
    margin-top: 32px;
  }
`;
