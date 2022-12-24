import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { unstable_getServerSession } from "next-auth";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import ChatIcon from "@mui/icons-material/Chat";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LogoutIcon from "@mui/icons-material/Logout";
import useSWR from "swr";

import { Loading } from "src/components/Loading";
import { ToolTip } from "src/components/Tooltip";
import { QuestionList } from "src/components/QuestionList";
import { ChatWindow } from "src/components/ChatWindow";
import { ChatIntro } from "src/components/ChatIntro";
import { NewQuestion } from "src/components/NewQuestion";
import { Input } from "src/components/Input";

import { buildNextAuthOptions } from "../api/auth/[...nextauth]";

export interface Chat {
  id: string;
  content: string;
  question_id: string;
  user_id: string;
  created_at: Date;
}

interface QuestionLists {
  id: string;
  content: string;
  user_id: string;
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
  avatar_url: string;
  created_at: Date;
  updated_at: Date;
}

function App() {
  const [activeQuestion, setActiveQuestion] =
    useState<QuestionLists>(undefined);
  const [showNewChat, setShowNewChat] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [themeMode, setThemeMode] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [allQuestions, setAllQuestions] = useState<QuestionLists[]>();
  const [globalErrorMessage, setGlobalErrorMessage] = useState(undefined);
  const [errorObject, setErrorObject] = useState(undefined);

  const { data, error } = useSWR<QuestionLists[]>(`/api/v1/questions/`, {
    refreshInterval: 1000,
  });

  useEffect(() => {
    if (!error) {
      setAllQuestions(data);
    }
    console.log(error);
    // setGlobalErrorMessage(`${error.message} ${error.action}`);
  }, [allQuestions, data, error]);

  const session = useSession();
  const router = useRouter();

  const isSignedIn = session.status == "authenticated";

  function handleWithSetMobileOpen() {
    setMobileOpen(!mobileOpen);
  }

  const handleNewChat = () => {
    setShowNewChat(true);
  };

  useEffect(() => {
    if (!isSignedIn) {
      router.push("../login");
    }
  }, [isSignedIn, router]);

  useEffect(() => {
    if (isDarkTheme) {
      setThemeMode("dark");
    } else {
      setThemeMode("");
    }
  }, [isDarkTheme, themeMode]);

  if (!isSignedIn) {
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
            {session.data?.user.avatar_url ? (
              <Image
                width={40}
                height={40}
                className="rounded-full cursor-pointer"
                src={session.data.user.avatar_url}
                alt={`Foto do usuário ${session.data.user.username}`}
              />
            ) : (
              ""
            )}

            <p className="ml-1 text-light-text dark:text-dark-text">
              {session.data.user.username}
            </p>
          </div>
          <div className="flex">
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
              onClick={() => signOut()}
            >
              <ToolTip tooltip="Logout">
                <LogoutIcon style={{ color: "#919191" }} />
              </ToolTip>
            </div>
          </div>
        </header>

        <Input placeholderText="Procurar por uma pergunta." icon={true} />

        <div className="flex-1 bg-light-background dark:bg-dark-background overflow-y-auto max-[994px]:w-screen">
          {/* //TODO: Atualizar em tempo real quando for criado uma nova question. */}
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
            chatData={activeQuestion}
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

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res)
  );
  return {
    props: {
      session,
    },
  };
};
