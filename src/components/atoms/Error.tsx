/** 外部import */
import { FC } from "react";
import styled from "styled-components";

/** 内部import */

export const Error: FC = () => {
  return <SText>データ取得に失敗しました( ；∀；)</SText>
}

/** style */
const SText = styled.p`
  margin: 10px 16px;
  text-align: center;
  font-weight: bold;
`