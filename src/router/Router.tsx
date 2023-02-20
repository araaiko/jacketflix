/** 外部import */
import { FC } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

/** 内部import */
import { Auth, Reset, SignIn, SignUp, Top, WorkInfo } from '../components/pages';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path={'/signup'} element={<SignUp />} />
      <Route path={'/signin'} element={<SignIn />} />
      <Route path="signin/reset" element={<Reset />} />

      <Route path={'/'} element={<Auth />}>
        <Route index element={<Top />} />
        <Route path={'/product/:id'} element={<WorkInfo />} />
      </Route>
    </>
  )
);

export const Router: FC = () => {
  return <RouterProvider router={router} />;
};
