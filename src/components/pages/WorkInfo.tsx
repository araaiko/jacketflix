/** 外部import */
import { FC, startTransition, useContext, useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { collection, doc, setDoc, getDocs } from 'firebase/firestore';

/** 内部import */
import type { FetchDetailData, FetchVideoData } from '../../types/api/fetchData';
import type { BtnState, MyListInfo } from '../../types/dataAndState/dataAndState';
import { instance } from '../../api/axios';
import { DetailPage } from '../templates';
import { UserContext } from '../../providers/UserProvider';
import { db, FirebaseTimestamp } from '../../firebase';

/** types */
type State = {
  mediaType: string;
};

// type AddMyListParams = () => void;

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
  const [myListBtn, setMyListBtn] = useState<BtnState>({ text: 'MyListに登録する', disabled: false });
  const [isLoading1, setIsLoading1] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);

  // お気に入り登録
  const onClickToAddMyList = (): void => {
    // usersコレクションのuidに、myListサブコレクションを作成（doc()でidを自動採番）
    const myListRef = doc(collection(db, 'users', uid, 'myList'));
    // 採番したidを格納
    const myListId = myListRef.id;
    const timestamp = FirebaseTimestamp.now();

    const posterPath = data?.poster_path !== undefined ? data?.poster_path : '';
    const backdropPath = data?.backdrop_path !== undefined ? data?.backdrop_path : '';
    const title = data?.title !== undefined ? data?.title : '';
    const originalName = data?.original_name !== undefined ? data?.original_name : '';
    const name = data?.name !== undefined ? data?.name : '';

    const addedMyList = {
      created_at: timestamp,
      id: data?.id,
      poster_path: posterPath,
      backdrop_path: backdropPath,
      original_name: originalName,
      name,
      title,
      my_list_id: myListRef.id,
      media_type: state.mediaType,
    };

    void setDoc(doc(db, 'users', uid, 'myList', myListId), addedMyList);
    setMyListBtn({
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
      startTransition(() => {
        setData(request.data);
      });
      setIsLoading1(false);
    };
    const fetchVideoId = async (): Promise<void> => {
      const request = await instance.get<FetchVideoData>(fetchVideoUrl);
      startTransition(() => {
        setVideoId(request.data.results[0]?.key);
      });
      setIsLoading2(false);
    };
    // myListに登録済みかどうか確認
    const checkAddedMyList = async (): Promise<void> => {
      const workInfoIds: string[] = [];

      await getDocs(collection(db, 'users', uid, 'myList')).then((snapshots) => {
        snapshots.forEach((snapshot) => {
          const data = snapshot.data() as MyListInfo;
          const dataId = data.id.toString();
          workInfoIds.push(dataId);
        });
      });

      if (workInfoIds.includes(workInfoId)) {
        setMyListBtn({
          text: 'MyListに登録済み',
          disabled: true,
        });
      }
    };
    void fetchData();
    void fetchVideoId();
    void checkAddedMyList();
  }, []);

  return (
    <DetailPage
      userName={user.username}
      data={data}
      myListBtn={myListBtn}
      onClick1={onClickToAddMyList}
      videoId={videoId}
      isLoading1={isLoading1}
      isLoading2={isLoading2}
    />
  );
};
