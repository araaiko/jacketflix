/** 外部import */
import { FC, useState } from 'react';
import styled from 'styled-components';

/** 内部import */
import type { FetchDetailData } from '../../types/api/fetchData';
import { MovieTitle, PrimaryText } from '../atoms';
import { TwoButtons } from '../molecules';
import { Header } from '../organisms';
import { onClickToNetflix } from '../../function/commonOnClick';

/** types */
type Props = {
  data: FetchDetailData | null;
  videoId: string;
};

export const DetailPage: FC<Props> = (props) => {
  const { data, videoId } = props;
  const [isThumbnail, setIsThumbnail] = useState(true);

  return (
    <>
      {/* ヘッダー */}
      <Header />
      {data !== null && (
        // 作品情報
        <SInfoItems>
          <SInfoImgWrapper>
            <SInfoImg
              src={`https://image.tmdb.org/t/p/original/${data?.backdrop_path ?? ''}`}
              alt={data?.title ?? data?.name ?? data?.original_name}
            />
          </SInfoImgWrapper>
          <SInfoTextWrapper>
            <MovieTitle>{data?.title ?? data?.name ?? data?.original_name}</MovieTitle>
            <STextWrapper>
              <PrimaryText>{data?.overview}</PrimaryText>
            </STextWrapper>
            <TwoButtons
              btnName1={'MyListに登録する'}
              onClick1={() => {
                alert('後で実装しようね');
              }}
              btnName2={'Netflixで視聴する'}
              onClick2={onClickToNetflix}
            />
          </SInfoTextWrapper>
        </SInfoItems>
      )}
      {/* 動画 */}
      {videoId !== '' && (
        <div>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            frameBorder="0"
            title="YouTube"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
    </>
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
    min-height: 450px;
    height: auto;

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

const SInfoImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const SInfoTextWrapper = styled(SInfoItem)`
  padding-top: 32px;
  padding-bottom: 32px;
  padding-left: 16px;
  padding-right: 16px;

  @media (min-width: 1024px) {
    padding-left: 32px;
    align-self: center;
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
