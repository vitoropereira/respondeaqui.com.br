import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useContext,
} from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseApp } from "../service/fireBase";
import { User } from "@prisma/client";
import { GetServerSideProps } from "next";

export interface UserFilteredProps {
  id: string;
  username: string;
  avatar_url: string;
  features: string[];
}

interface AuthUserContextProps {
  currentUser: UserFilteredProps | undefined;
  fetchUser: (email: string) => Promise<void>;
  isLoading: boolean;
  loading: () => void;
}

interface AuthUserContextProviderProps {
  children: ReactNode;
}

const userEndpoint = "/api/v1/user";

export const AuthUserContext = createContext({} as AuthUserContextProps);

export function AuthUserContextProvider({
  children,
}: AuthUserContextProviderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(undefined);
  const [currentUser, setCurrentUser] = useState<
    UserFilteredProps | undefined
  >();

  function loading() {
    setIsLoading(!isLoading);
  }

  const auth = getAuth(firebaseApp);

  const fetchUser = useCallback(async (email: string) => {
    try {
      const response = await fetch(userEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(email),
      });

      const responseBody = await response.json();

      if (response.status === 200) {
        const fetchedUser = responseBody as User;

        const filteredUserData = {
          id: fetchedUser.id,
          username: fetchedUser.username,
          avatar_url: fetchedUser.avatar_url,
          features: fetchedUser.features,
        };

        setCurrentUser(filteredUserData);
        localStorage.setItem(
          "respondeaqui:user",
          JSON.stringify(filteredUserData)
        );
      } else {
        setCurrentUser(null);
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
        const user = JSON.parse(storedUser);
        setCurrentUser(user);
        await fetchUser(user.email);
      }
      setIsLoading(false);
    })();
  }, [fetchUser]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const userData = {
        id: user?.uid,
        name: user?.displayName,
        avatar: user?.photoURL,
        email: user?.email,
      };
      getUser(user?.email);
    });

    async function getUser(email: string) {
      await fetchUser(email);
    }

    return unsubscribe;
  }, [auth, fetchUser]);

  return (
    <AuthUserContext.Provider
      value={{
        currentUser,
        fetchUser,
        isLoading,
        loading,
      }}
    >
      {children}
    </AuthUserContext.Provider>
  );
}

export function useAuthUser() {
  return useContext(AuthUserContext);
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return {
    props: {},
  };
};
