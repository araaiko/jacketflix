/** 外部import */
import type { NavigateFunction } from 'react-router-dom';

/** types */
type Params = (id: number | undefined, mediaType: string, navigate: NavigateFunction) => void;

export const onClickToWorkInfo: Params = (id, mediaType, navigate) => {
  if (id !== null && id !== undefined) {
    if (mediaType === 'movie') {
      navigate(`/product/${id}`, { state: { mediaType: 'movie' } });
    } else if (mediaType === 'tv') {
      navigate(`/product/${id}`, { state: { mediaType: 'tv' } });
    }
  } else {
    alert('ページが存在しません');
  }
};

export const onClickToNetflix = (): void => {
    window.open('https://www.netflix.com/jp/');
  };

