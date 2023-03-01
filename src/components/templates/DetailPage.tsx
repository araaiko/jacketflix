/** 外部import */
import { FC, useContext } from 'react';
import styled from 'styled-components';

/** 内部import */
import type { FetchDetailData } from '../../types/api/fetchData';
import type { BtnState } from '../../types/dataAndState/dataAndState';
import { Header, TwoColumnInfo } from '../organisms';
import { onClickToNetflix } from '../../function/commonOnClick';
import { UserContext } from '../../providers/UserProvider';
import { Trailer } from '../organisms/Trailer';

/** types */
type Props = {
  data: FetchDetailData | null;
  videoId: string;
  onClick1: () => void;
  onClick1Style: BtnState;
};

export const DetailPage: FC<Props> = (props) => {
  const { data, videoId, onClick1, onClick1Style } = props;
  const { user } = useContext(UserContext);

  return (
    <SBody>
      {/* ヘッダー */}
      <Header userName={user.username} />
      {/* 作品情報 */}
      {data !== null && (
        <TwoColumnInfo
          imgSrc={`https://image.tmdb.org/t/p/original/${data?.backdrop_path ?? ''}`}
          imgAlt={data.title ?? data.name ?? data.original_name ?? ''}
          title={data.title ?? data.name ?? data.original_name ?? ''}
          overview={data?.overview}
          btnName1={onClick1Style.text}
          onClick1={onClick1}
          disabled1={onClick1Style.disabled}
          btnName2={'Netflixで視聴する'}
          onClick2={onClickToNetflix}
        />
      )}
      {/* 動画 */}
      {videoId !== '' && (
        <STrailerWrapper>
          <Trailer src={`https://www.youtube.com/embed/${videoId}`} />
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
