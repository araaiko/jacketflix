/** 外部import */
import { FC, useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

/** 内部import */
import type { FetchDetailData } from '../../types/api/fetchData';
import { instance } from '../../api/axios';

/** types */
type State = {
  mediaType: string;
};

export const WorkInfo: FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const state = location.state as State;
  const [data, setData] = useState < FetchDetailData | null>(null);

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
      <h1>作品情報ページ</h1>
      <p>ここのidは{id}です</p>
      <p>media typeは{state.mediaType}です</p>
      <p>作品名：{data?.name}</p>
      <p>作品ID：{data?.id}</p>
      <p>オリジナルタイトル：{data?.original_name}</p>
      <p>タイトル：{data?.title}</p>
      <p>あらすじ：{data?.overview}</p>
      <p>画像パス：{data?.backdrop_path}</p>
    </>
  );
};
