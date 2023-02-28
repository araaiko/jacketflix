/** 外部import */
import { FC } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

/** 内部import */
import { Auth, MyList, Page404, Reset, SignIn, SignUp, Top, WorkInfo } from '../components/pages';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path={'/signup'} element={<SignUp />} />
      <Route path={'/signin'} element={<SignIn />} />
      <Route path="signin/reset" element={<Reset />} />

      <Route path={'/'} element={<Auth />}>
        <Route index element={<Top />} />
        <Route path={'/product/:id'} element={<WorkInfo />} errorElement={<Page404 />} />
        <Route path={'/mylist'} element={<MyList />} />
        <Route path={'*'} element={<Page404 />} />
      </Route>
    </>
  )
);

export const Router: FC = () => {
  return <RouterProvider router={router} />;
};
