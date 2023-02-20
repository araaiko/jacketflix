/** 外部import */
import { createContext, Dispatch, FC, ReactNode, SetStateAction, useState } from 'react';

/** 内部import */
import type { User } from '../types/Context/user';

/** types */
type UserContextType = {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
};

type Props = {
  children: ReactNode;
};

export const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider: FC<Props> = (props) => {
  const { children } = props;
  const [user, setUser] = useState<User>({ isSignedIn: false, role: '', uid: '', username: '' });

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
