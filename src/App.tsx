/** 外部import */
import React, { FC } from 'react';

/** 内部import */
import './App.css';
import { Top } from './components/pages/Top';

export const App: FC = () => {
  return <div className="App">
    <Top />
  </div>;
};
