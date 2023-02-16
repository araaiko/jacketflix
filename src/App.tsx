/** 外部import */
import React, { FC, useEffect } from 'react';

/** 内部import */
import { GlobalStyle } from './style';
import { Router } from './router/Router';
import { changeViewport } from './lib/changeViewport';

export const App: FC = () => {
  useEffect(() => {
    changeViewport();
  });

  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
};
