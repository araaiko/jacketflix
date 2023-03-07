/** 外部import */
import { FC, memo } from 'react';
import styled from 'styled-components';

/** 内部import */
import type { FetchDetailData } from '../../types/api/fetchData';
import type { BtnState } from '../../types/dataAndState/dataAndState';
import { Loading } from '../atoms';
import { Header, Trailer, TwoColumnInfo } from '../organisms';

/** types */
type Props = {
  userName: string;
  data: FetchDetailData | null;
  myListBtn: BtnState;
  videoId: string;
  onClick1: () => void;
  isLoading1: boolean;
  isLoading2: boolean;
};

export const DetailPage: FC<Props> = memo((props) => {
  const { userName, data, myListBtn, videoId, onClick1, isLoading1, isLoading2 } = props;

  return (
    <SBody>
      <Header userName={userName} />
      {/* 作品情報 */}
      {isLoading1 ? (
        <Loading />
      ) : (
        data !== null && <TwoColumnInfo data={data} onClick1={onClick1} myListBtn={myListBtn} />
      )}
      {/* 動画 */}
      {isLoading2 ? (
        <Loading />
      ) : (
        videoId !== '' && (
          <STrailerWrapper>
            <Trailer src={`https://www.youtube.com/embed/${videoId}`} />
          </STrailerWrapper>
        )
      )}
    </SBody>
  );
});

DetailPage.displayName = 'DetailPage';

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
