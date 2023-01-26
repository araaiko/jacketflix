/** 外部import */
import { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const CategoryTitle: FC<Props> = ({ children }) => {
  return <h2>{children}</h2>;
};
