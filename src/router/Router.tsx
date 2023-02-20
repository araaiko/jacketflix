/** 外部import */
import { FC } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

/** 内部import */
import { SignUp, Top, WorkInfo } from '../components/pages';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path={'/signup'} element={<SignUp />} />

      <Route index element={<Top />} />
      <Route path={'/product/:id'} element={<WorkInfo />} />
    </>
  )
);

export const Router: FC = () => {
  return <RouterProvider router={router} />;
};
