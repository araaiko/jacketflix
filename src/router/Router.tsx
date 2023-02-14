/** 外部import */
import { FC } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

/** 内部import */
import { WorkInfo, Top } from '../components/pages';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index element={<Top />} />
      <Route path={'/product/:id'} element={<WorkInfo />} />
    </>
  )
);

export const Router: FC = () => {
  return <RouterProvider router={router} />;
};
