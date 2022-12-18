import { User } from "@prisma/client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
//TODO TRANSFORMAR ESTE AQUIVO PARA TYPESCRIPT
const userEndpoint = "/api/v1/user";
// const sessionEndpoint = "/api/v1/sessions";

interface UserContextProps {
  id: string;
  username: string;
  avatarURL: string;
  email: string;
  signInMethod: string[];
}

export const UserContext = createContext({} as UserContextProps);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(undefined);

  const fetchUser = useCallback(async () => {
    try {
      const response = await fetch(userEndpoint);
      const responseBody = await response.json();

      if (response.status !== 401 && response.status !== 403) {
        const fetchedUser = responseBody as User;

        const cachedUserProperties = {
          id: fetchedUser.id,
          username: fetchedUser.username,
          features: fetchedUser.features,
        };

        setUser(fetchedUser);
        localStorage.setItem("user", JSON.stringify(cachedUserProperties));
      } else {
        setUser(null);
        localStorage.removeItem("user");
        const error = new Error(responseBody.message);
        throw error;
      }
    } catch (error) {
      setError(error);
    }
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    (async () => {
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        await fetchUser();
      }
      setIsLoading(false);
    })();
  }, [fetchUser]);

  // const logout = useCallback(async () => {
  //   try {
  //     const response = await fetch(sessionEndpoint, {
  //       method: "DELETE",
  //     });

  //     if (response.status === 200) {
  //       localStorage.clear();
  //       setUser(null);
  //     }
  //   } catch (error) {
  //     setError(error);
  //   }
  // }, []);

  const userContextValue = {
    user,
    isLoading,
    error,
    fetchUser,
    // logout,
  };

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
}

export default function useUser() {
  return useContext(UserContext);
}
