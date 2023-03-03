/** 外部import */
import { FC } from 'react';
import styled from 'styled-components';

/** 内部import */
import type { FetchDetailData } from '../../types/api/fetchData';
import type { BtnState } from '../../types/dataAndState/dataAndState';
import { Header, Trailer, TwoColumnInfo } from '../organisms';

/** types */
type Props = {
  userName: string;
  data: FetchDetailData | null;
  myListBtn: BtnState;
  videoId: string;
  onClick1: () => void;
};

export const DetailPage: FC<Props> = (props) => {
  const { userName, data, myListBtn, videoId, onClick1 } = props;

  return (
    <SBody>
      <Header userName={userName} />
      {/* 作品情報 */}
      {data !== null && <TwoColumnInfo data={data} onClick1={onClick1} myListBtn={myListBtn} />}
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
