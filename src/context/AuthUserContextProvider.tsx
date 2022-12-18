import { createContext, useState, useEffect, ReactNode } from "react";
import {
  getAuth,
  onAuthStateChanged,
  User,
  UserCredential,
} from "firebase/auth";
import { firebaseApp } from "../service/fireBase";

export interface UserProps {
  id?: string | null | undefined;
  userId?: string | null | undefined;
  name?: string | null | undefined;
  avatar?: string | null | undefined;
  email?: string | null | undefined;
}

interface AuthUserContextProps {
  currentUser: UserProps | undefined;
}

interface AuthUserContextProviderProps {
  children: ReactNode;
}

export const AuthUserContext = createContext({} as AuthUserContextProps);

export function AuthUserContextProvider({
  children,
}: AuthUserContextProviderProps) {
  const [currentUser, setCurrentUser] = useState<UserProps | undefined>();

  const auth = getAuth(firebaseApp);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const userData = {
        id: user?.uid,
        name: user?.displayName,
        avatar: user?.photoURL,
        email: user?.email,
      };
      setCurrentUser(userData);
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthUserContext.Provider value={{ currentUser }}>
      {children}
    </AuthUserContext.Provider>
  );
}
