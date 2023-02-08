/** 外部import */
import { FC, useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

/** 内部import */
import type { FetchDetailData } from '../../types/api/fetchData';
import { instance } from '../../api/axios';
import { DetailPage } from '../templates';

/** types */
type State = {
  mediaType: string;
};

export const WorkInfo: FC = () => {
  // URLの末尾（パラメーター）を取得（※動的パスで設定した定数名と同じ名前にすること）
  const { id } = useParams();
  // ページ遷移時に渡したstate(mediaType)の取得
  const location = useLocation();
  const state = location.state as State;

  const [data, setData] = useState<FetchDetailData | null>(null);

  useEffect(() => {
    // テンプレートリテラル(fetchUrl)ではstring | undefinedしか定義されていないため、stringに合致するよう調整
    const REACT_APP_TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
    const workInfoId = id?.toString();
    let fetchUrl: string;

    // media typeによってURLを出し分ける
    if (REACT_APP_TMDB_API_KEY !== undefined && workInfoId !== undefined) {
      if (state.mediaType === 'movie') {
        fetchUrl = `/movie/${workInfoId}?api_key=${REACT_APP_TMDB_API_KEY}&language=en-US`;
      } else if (state.mediaType === 'tv') {
        fetchUrl = `/tv/${workInfoId}?api_key=${REACT_APP_TMDB_API_KEY}&language=en-US`;
      }
    }

    const fetchData = async (): Promise<void> => {
      const request = await instance.get<FetchDetailData>(fetchUrl);
      setData(request.data);
    };
    void fetchData();
  }, []);

  return (
    <>
      <DetailPage data={data} />
    </>
  );
};
