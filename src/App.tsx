/** 外部import */
import React, { FC, useEffect } from 'react';

/** 内部import */
import { GlobalStyle } from './style';
import { Router } from './router/Router';
import { changeViewport } from './lib/changeViewport';
import { UserProvider } from './providers/UserProvider';

export const App: FC = () => {
  useEffect(() => {
    changeViewport();
  });

  return (
    <UserProvider>
      <GlobalStyle />
      <Router />
    </UserProvider>
  );
};
