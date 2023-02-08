/** 外部import */
import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

/** 内部import */
import type { MovieInfo } from '../../types/api/fetchData';
import { MovieTitle, PrimaryText } from '../atoms';
import { TwoButtons } from '../molecules';
import { onClickToWorkInfo } from '../../function/commonOnClick';

type Props = {
  data: MovieInfo[];
  mediaType: string;
};
type Truncate = (str: string | undefined, n: number) => string | undefined;

export const Banner: FC<Props> = (props) => {
  const { data, mediaType } = props;
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieInfo | null>(null);

  // 親から値(props)が渡される前に初回レンダリングが実行されるため、props(data)が更新される度に走るよう記述
  useEffect(() => {
    setMovie(data[Math.floor(Math.random() * data.length - 1)]);
  }, [data]);

  // あらすじの一部省略
  const truncate: Truncate = (str, n) => {
    if (str !== undefined) {
      return str.length > n ? str.substring(0, n) + '...' : str;
    }
  };

  // ボタンリンク先
  const onClickToNetflix = (): void => {
    window.open('https://www.netflix.com/jp/');
  };

  return (
    <SBanner bgImg={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path ?? ''}`}>
      <SInfoWrapper>
        <MovieTitle>{movie?.title ?? movie?.name ?? movie?.original_name}</MovieTitle>
        <TwoButtons
          btnName1={'作品情報を見る'}
          onClick1={() => {
            onClickToWorkInfo(movie?.id, mediaType, navigate);
          }}
          btnName2={'Netflixで視聴する'}
          onClick2={onClickToNetflix}
        />
        <STextWrapper>
          <PrimaryText>{truncate(movie?.overview, 150)}</PrimaryText>
        </STextWrapper>
      </SInfoWrapper>
    </SBanner>
  );
};

/** style */
type SBannerProps = {
  bgImg: string;
};
const SBanner = styled.div<SBannerProps>`
  background: transparent url(${({ bgImg }) => bgImg}) no-repeat center center / cover;
  width: 100%;
  height: 100vh;
  position: relative;
  color: #fff;
  padding-left: 16px;
  padding-right: 16px;

  &::after {
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 7.4rem;
    background-image: linear-gradient(180deg, transparent, rgba(37, 37, 37, 0.61), #111);
  }

  @media (min-width: 768px) {
    height: 448px;
  }

  @media (min-width: 1024px) {
    padding-left: 56px;
    padding-right: 56px;
  }
`;

const SInfoWrapper = styled.div`
  position: absolute;
  bottom: 10%;
  text-align: left;

  @media (min-width: 768px) {
    position: relative;
    top: 50%;
    bottom: 0;
    transform: translateY(-50%);
  }
`;

const STextWrapper = styled.div`
  margin-top: 24px;
  width: 100%;
  max-width: 350px;

  @media (min-width: 768px) {
    margin-top: 32px;
  }
`;
