/** 外部import */
import { FC, useContext, useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { collection, doc, setDoc, getDocs } from 'firebase/firestore';

/** 内部import */
import type { FetchDetailData, FetchVideoData } from '../../types/api/fetchData';
import type { BtnState } from '../../types/state/state';
import { instance } from '../../api/axios';
import { DetailPage } from '../templates';
import { UserContext } from '../../providers/UserProvider';
import { db } from '../../firebase';

/** types */
type State = {
  mediaType: string;
};

type AddFavoriteParams = (data: FetchDetailData | null) => void;

type FavoriteInfo = {
  id: number;
  poster_path: string;
  backdrop_path: string;
  original_name: string;
  name: string;
  title: string;
  favoriteId: string;
};

export const WorkInfo: FC = () => {
  const { user } = useContext(UserContext);
  const uid = user.uid;
  // URLの末尾（パラメーター）を取得（※動的パスで設定した定数名と同じ名前にすること）
  const { id } = useParams();
  // ページ遷移時に渡したstate(mediaType)の取得
  const location = useLocation();
  const state = location.state as State;

  const [data, setData] = useState<FetchDetailData | null>(null);
  const [videoId, setVideoId] = useState<string>(''); // YouTube
  const [favoriteBtn, setFavoriteBtn] = useState<BtnState>({ text: 'MyListに登録する', disabled: false });

  // お気に入り登録
  const onClickToAddFavorite: AddFavoriteParams = (data) => {
    // usersコレクションのuidに、favoriteサブコレクションを作成（doc()でidを自動採番）
    const favoriteRef = doc(collection(db, 'users', uid, 'favorite'));
    // 採番したidを格納
    const id = favoriteRef.id;

    const posterPath = data?.poster_path !== undefined ? data?.poster_path : '';
    const backdropPath = data?.backdrop_path !== undefined ? data?.backdrop_path : '';
    const title = data?.title !== undefined ? data?.title : '';
    const originalName = data?.original_name !== undefined ? data?.original_name : '';
    const name = data?.name !== undefined ? data?.name : '';

    const addedFavorite = {
      id: data?.id,
      poster_path: posterPath,
      backdrop_path: backdropPath,
      original_name: originalName,
      name,
      title,
      favoriteId: favoriteRef.id,
    };

    void setDoc(doc(db, 'users', uid, 'favorite', id), addedFavorite);
    setFavoriteBtn({
      text: 'MyListに登録済み',
      disabled: true,
    });
  };

  useEffect(() => {
    // テンプレートリテラル(fetchUrl)ではstring | undefinedしか定義されていないため、stringに合致するよう調整
    const REACT_APP_TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
    const workInfoId = id !== undefined ? id?.toString() : '';
    let fetchUrl: string;
    let fetchVideoUrl: string;

    // media typeによって各URLを出し分ける
    if (REACT_APP_TMDB_API_KEY !== undefined && workInfoId !== undefined) {
      if (state.mediaType === 'movie') {
        fetchUrl = `/movie/${workInfoId}?api_key=${REACT_APP_TMDB_API_KEY}&language=en-US`;
        fetchVideoUrl = `/movie/${workInfoId}/videos?api_key=${REACT_APP_TMDB_API_KEY}&language=en-US`;
      } else if (state.mediaType === 'tv') {
        fetchUrl = `/tv/${workInfoId}?api_key=${REACT_APP_TMDB_API_KEY}&language=en-US`;
        fetchVideoUrl = `/tv/${workInfoId}/videos?api_key=${REACT_APP_TMDB_API_KEY}&language=ja-JP`;
      }
    }

    const fetchData = async (): Promise<void> => {
      const request = await instance.get<FetchDetailData>(fetchUrl);
      setData(request.data);
    };
    const fetchVideoId = async (): Promise<void> => {
      const request = await instance.get<FetchVideoData>(fetchVideoUrl);
      setVideoId(request.data.results[0]?.key);
    };
    // お気に入り登録済みかどうか確認
    const checkAddedFavorite = async (): Promise<void> => {
      const workInfoIds: string[] = [];
      
      await getDocs(collection(db, 'users', uid, 'favorite')).then((snapshots) => {
        snapshots.forEach((snapshot) => {
          const data = snapshot.data() as FavoriteInfo;
          const dataId = data.id.toString();
          workInfoIds.push(dataId);
        });
      });
      // console.log('配列', workInfoIds);

      if (workInfoIds.includes(workInfoId)) {
        setFavoriteBtn({
          text: 'MyListに登録済み',
          disabled: true,
        });
      }
    };
    void fetchData();
    void fetchVideoId();
    void checkAddedFavorite();
  }, []);

  // console.log(videoId);
  return (
    <DetailPage
      data={data}
      videoId={videoId}
      onClick1={() => {
        onClickToAddFavorite(data);
      }}
      onClick1Style={favoriteBtn}
    />
  );
};
