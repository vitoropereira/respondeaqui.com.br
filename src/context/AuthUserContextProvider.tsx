import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createContext, useState } from "react";

interface User {
  id: string;
  name: string;
  avatar: string;
}

interface AuthUserContextType {
  user: User;
}

export const AuthUserContext = createContext({} as AuthUserContextType);

export function AuthUserContextProvider({ children }) {
  const [userAuth, setUserAuth] = useState<User>();

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const newUser = {
        id: user.uid,
        name: user.displayName,
        avatar: user.photoURL,
      };

      setUserAuth(newUser);
      // console.log(userAuth);
    } else {
      // User is signed out
      // ...
    }
  });
  return (
    <AuthUserContext.Provider value={{ user: userAuth }}>
      {children}
    </AuthUserContext.Provider>
  );
}
