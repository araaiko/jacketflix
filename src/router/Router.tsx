/** 外部import */
import { FC } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

/** 内部import */
import { ProductDetail, Top } from '../components/pages';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index element={<Top />} />
      <Route path={'/product/:id'} element={<ProductDetail />} />
    </>
  )
);

export const Router: FC = () => {
  return <RouterProvider router={router} />;
};
