/** 外部import */
import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

/** 内部import */
import type { MovieInfo } from '../../types/api/fetchData';
import { colorVariables as c } from '../../style';
import { H2Title, PrimaryText } from '../atoms';
import { TwoButtons } from '../molecules';
import { onClickToWorkInfo, onClickToNetflix } from '../../function/commonOnClick';

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

  return (
    <>
      {movie !== null && (
        <SBanner bgImg={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path ?? ''}`}>
          <SInfoWrapper>
            <H2Title fontSize={'clamp(32px, 6vw, 48px)'}>
              {movie?.title ?? movie?.name ?? movie?.original_name}
            </H2Title>
            <STwoButtonsWrapper>
              <TwoButtons
                btnName1={'作品情報を見る'}
                onClick1={() => {
                  onClickToWorkInfo(movie?.id, mediaType, navigate);
                }}
                btnName2={'Netflixで視聴する'}
                onClick2={onClickToNetflix}
              />
            </STwoButtonsWrapper>
            <STextWrapper>
              <PrimaryText>{truncate(movie?.overview, 150)}</PrimaryText>
            </STextWrapper>
          </SInfoWrapper>
        </SBanner>
      )}
    </>
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
  color: ${c.secondary};
  padding-left: clamp(16px, 3.5vw, 56px);
  padding-right: clamp(16px, 3.5vw, 56px);
  display: flex;

  &::after {
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 7.4rem;
    background-image: linear-gradient(180deg, transparent, ${c.gradient}, ${c.primary});
  }

  @media (min-width: 768px) {
    min-height: 448px;
    height: auto;
  }
`;

const SInfoWrapper = styled.div`
  text-align: left;
  align-self: flex-end;
  margin-bottom: 60px;

  @media (min-width: 768px) {
    align-self: center;
    padding-top: 96px;
    padding-bottom: 96px;
    margin-bottom: 0;
  }
`;

const STwoButtonsWrapper = styled.div`
  max-width: 360px;

  @media (min-width: 768px) {
    max-width: 100%;
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
