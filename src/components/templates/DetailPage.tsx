/** 外部import */
import { FC } from 'react';
import styled from 'styled-components';

/** 内部import */
import type { FetchDetailData } from '../../types/api/fetchData';
import { Header, Trailer, TwoColumnInfo } from '../organisms';

/** types */
type Props = {
  userName: string;
  data: FetchDetailData | null;
  videoId: string;
  imgSrc: string;
  imgAlt: string;
  title: string;
  overview: string;
  btnName1: string;
  onClick1: () => void;
  disabled1: boolean;
  btnName2: string;
  onClick2: () => void;
  trailerSrc: string;
};

export const DetailPage: FC<Props> = (props) => {
  const {
    userName,
    data,
    videoId,
    imgSrc,
    imgAlt,
    title,
    overview,
    btnName1,
    onClick1,
    disabled1,
    btnName2,
    onClick2,
    trailerSrc,
  } = props;

  return (
    <SBody>
      <Header userName={userName} />
      {/* 作品情報 */}
      {data !== null && (
        <TwoColumnInfo
          imgSrc={imgSrc}
          imgAlt={imgAlt}
          title={title}
          overview={overview}
          btnName1={btnName1}
          onClick1={onClick1}
          disabled1={disabled1}
          btnName2={btnName2}
          onClick2={onClick2}
        />
      )}
      {/* 動画 */}
      {videoId !== '' && (
        <STrailerWrapper>
          <Trailer src={trailerSrc} />
        </STrailerWrapper>
      )}
    </SBody>
  );
};

/** style */
const SBody = styled.div`
  padding-bottom: 120px;
`;

const STrailerWrapper = styled.div`
  margin-top: 40px;
  width: calc(100% - 32px);
  max-width: 1440px;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 768px) {
    margin-top: 80px;
  }
`;
