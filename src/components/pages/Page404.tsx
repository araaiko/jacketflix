/** 外部import */
import { FC, useContext } from 'react';

/** 内部import */
import { Page404Screen } from '../templates';
import { UserContext } from '../../providers/UserProvider';

export const Page404: FC = () => {
  const { user } = useContext(UserContext);

  return <Page404Screen userName={user.username} />;
};
