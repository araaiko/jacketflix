/** 外部import */
import { createContext, Dispatch, FC, ReactNode, SetStateAction, useState } from 'react';

/** types */
type User = {
  isSignedIn: boolean;
  role: string;
  uid: string;
  username: string;
};

type Props = {
  children: ReactNode;
};

// type で定義して設定すると、初期値に{}がセットできずエラーになるため、{} as {}で記述
export const UserContext = createContext(
  {} as {
    user: User;
    setUser: Dispatch<SetStateAction<User>>;
  }
);

export const UserProvider: FC<Props> = (props) => {
  const { children } = props;
  const [user, setUser] = useState<User>({ isSignedIn: false, role: '', uid: '', username: '' });

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
