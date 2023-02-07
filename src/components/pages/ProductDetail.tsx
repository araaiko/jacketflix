/** 外部import */
import { FC } from 'react';
import { useParams } from "react-router-dom";

export const ProductDetail: FC = () => {
  const { id } = useParams();

  return (
    <>
      <h1>作品情報ページ</h1>
      <p>ここのidは{id}です</p>
    </>
  );
};
