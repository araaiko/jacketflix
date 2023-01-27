/** 外部import */
import React, { FC, useEffect } from 'react';

/** 内部import */
import { GlobalStyle } from './style/GlobalStyle';
import { Top } from './components/pages/Top';
import { changeViewport } from "./lib/changeViewport";

export const App: FC = () => {
  useEffect(() => {
    changeViewport();
  });

  return (
    <div className="App">
      <GlobalStyle />
      <Top />
    </div>
  );
};
