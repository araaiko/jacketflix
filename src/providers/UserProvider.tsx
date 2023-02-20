/** 外部import */
import { createContext, Dispatch, FC, ReactNode, SetStateAction, useState } from 'react';

/** types */
type User = {
  isSignedIn: boolean;
  role: string;
  uid: string;
  username: string;
};

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
