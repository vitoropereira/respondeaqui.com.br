import { useState, useContext, useEffect, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import ChatIcon from "@mui/icons-material/Chat";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LogoutIcon from "@mui/icons-material/Logout";

import { Loading } from "src/components/Loading";
import { ToolTip } from "src/components/Tooltip";
import { QuestionList } from "src/components/QuestionList";
import { ChatWindow } from "src/components/ChatWindow";
import { ChatIntro } from "src/components/ChatIntro";
import { NewQuestion } from "src/components/NewQuestion";
import { Input } from "src/components/Input";
import {
  AuthUserContext,
  UserFilteredProps,
} from "src/context/AuthUserContextProvider";
import { SignIn } from "phosphor-react";

export interface Chat {
  id: string;
  content: string;
  questionId: string;
  userId: string;
  created_at: Date;
}

interface QuestionLists {
  id: string;
  content: string;
  userId: string;
  created_at: string;
  updated_at: string;
  user: User;
  chat: Chat[];
}

interface User {
  id: string;
  username: string;
  email: string;
  signInMethod: string[];
  features: string[];
  avatarURL: string;
  created_at: Date;
  updated_at: Date;
}

function App() {
  const [activeQuestion, setActiveQuestion] =
    useState<QuestionLists>(undefined);
  const [user, setUser] = useState<UserFilteredProps>();
  const [showNewChat, setShowNewChat] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [themeMode, setThemeMode] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [allQuestions, setAllQuestions] = useState<QuestionLists[]>();
  const [globalErrorMessage, setGlobalErrorMessage] = useState(undefined);
  const [errorObject, setErrorObject] = useState(undefined);

  const router = useRouter();
  const { currentUser, fetchUser, isLoading, loading } =
    useContext(AuthUserContext);

  function handleWithSetMobileOpen() {
    setMobileOpen(!mobileOpen);
  }

  const handleNewChat = () => {
    setShowNewChat(true);
  };

  const handleMakeLogin = () => {
    router.push("../login");
  };

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
    }

    if (!user) {
      const localStorageContent = localStorage.getItem("respondeaqui:user");
      setUser(JSON.parse(localStorageContent));
    }
  }, [currentUser, router, user]);

  useEffect(() => {
    if (isDarkTheme) {
      setThemeMode("dark");
    } else {
      setThemeMode("");
    }
  }, [isDarkTheme, themeMode]);

  async function getAllQuestion() {
    try {
      const response = await fetch(`/api/v1/questions/`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      setGlobalErrorMessage(undefined);

      const responseBody = await response.json();
      if (response.status === 200) {
        loading();
        setAllQuestions(responseBody);
        return;
      }

      if (response.status === 400) {
        setErrorObject(responseBody);
        loading();
        return;
      }

      if (response.status >= 401) {
        setGlobalErrorMessage(`${responseBody.message} ${responseBody.action}`);
        loading();
        return;
      }
    } catch (error) {
      console.log("error");
      console.log(error);
      setGlobalErrorMessage(
        "Não foi possível se conectar ao Responde Aqui. Por favor, verifique sua conexão."
      );
      loading();
    }
  }

  useEffect(() => {
    getAllQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //TODO: QUANDO REALMENTE NÃO TIVER USER E NÃO FOR APENAS ESPERANDO O CURRENTuSER
  if (!user) {
    return <Loading />;
  }
  //TODO: Verificar a Responsividade!!!
  return (
    <div
      className={`flex h-screen bg-light-backgroundSecond dark:bg-dark-backgroundSecond ${themeMode}`}
    >
      <div className="w-[35%] max-w-[415px] flex flex-col border-r border-r-light-border dark:border-r-dark-border">
        <NewQuestion show={showNewChat} setShow={setShowNewChat} />

        <header className="h-[60px] flex justify-between items-center px-4 py-0 max-[994px]:w-screen bg-light-backgroundSecond dark:bg-dark-backgroundSecond">
          <div className="flex justify-center items-center gap-2">
            {user.avatarURL ? (
              <Image
                width={40}
                height={40}
                className="rounded-full cursor-pointer"
                src={user.avatarURL}
                alt={`Foto do usuário ${user.username}`}
              />
            ) : (
              ""
            )}

            <p className="ml-1 text-light-text dark:text-dark-text">
              {user.username}
            </p>
          </div>
          <div className="flex">
            {!user ? (
              <div
                onClick={handleMakeLogin}
                className="w-10 h-10 rounded-[20px] flex justify-center items-center cursor-pointer"
              >
                <SignIn size={32} color="#919191" />
              </div>
            ) : (
              <>
                <div
                  onClick={() => setIsDarkTheme(!isDarkTheme)}
                  className="w-10 h-10 rounded-[20px] flex justify-center items-center cursor-pointer"
                >
                  <ToolTip tooltip="Tema Dark/Light">
                    <DarkModeIcon style={{ color: "#919191" }} />
                  </ToolTip>
                </div>

                <div
                  onClick={handleNewChat}
                  className="w-10 h-10 rounded-[20px] flex justify-center items-center cursor-pointer"
                  title="Fazer uma nova pergunta!"
                >
                  <ToolTip tooltip="Clique para fazer uma nova pergunta!">
                    <ChatIcon style={{ color: "#919191" }} />
                  </ToolTip>
                </div>
                <div
                  className="w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
                  // onClick={logout}
                >
                  <ToolTip tooltip="Logout">
                    <LogoutIcon style={{ color: "#919191" }} />
                  </ToolTip>
                </div>
              </>
            )}
          </div>
        </header>

        <Input placeholderText="Procurar por uma pergunta." icon={true} />

        <div className="flex-1 bg-light-background dark:bg-dark-background overflow-y-auto max-[994px]:w-screen">
          {allQuestions &&
            allQuestions.map((item) => {
              return (
                <QuestionList
                  key={item.id}
                  data={item}
                  active={activeQuestion?.id === item.id}
                  onClick={() => setActiveQuestion(item)}
                  onMobileClick={() => setMobileOpen(true)}
                />
              );
            })}
        </div>
      </div>
      <div className="flex-1 h-screen">
        {activeQuestion !== undefined && (
          <ChatWindow
            data={activeQuestion}
            handleWithSetMobileOpen={handleWithSetMobileOpen}
            mobileOpen={mobileOpen}
          />
        )}

        {activeQuestion === undefined && <ChatIntro />}
      </div>
    </div>
  );
}

export default App;
