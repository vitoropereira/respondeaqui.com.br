/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useContext, useEffect, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import ChatIcon from "@mui/icons-material/Chat";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SearchIcon from "@mui/icons-material/Search";

import { ChatIntro } from "../../components/ChatIntro";
import { ChatList } from "../../components/ChatList";
import { ChatWindow } from "../../components/ChatWindow";
import { Loading } from "../../components/Loading";
import { NewChat } from "../../components/NewChat";
import { ToolTip } from "../../components/Tooltip";
import {
  AuthUserContext,
  UserProps,
} from "../../context/AuthUserContextProvider";

function App() {
  const [chatList, setChatList] = useState([]);
  const [activeChat, setActiveChat] = useState({
    chatId: undefined,
  });
  const [user, setUser] = useState<UserProps>();
  const [showNewChat, setShowNewChat] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [themeMode, setThemeMode] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { currentUser } = useContext(AuthUserContext);
  const router = useRouter();

  const handleNewChat = () => {
    setShowNewChat(true);
  };

  const isAuthenticated = useMemo(() => {
    if (currentUser) {
      setIsLoading(false);
      return true;
    }
  }, []);

  useEffect(() => {
    console.log("currentUser");
    console.log(currentUser);
    if (isAuthenticated) {
      const userData = {
        id: currentUser?.id,
        name: currentUser?.name,
        avatar: currentUser?.avatar,
      };

      setUser(userData);
    } else {
      router.push("./login");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isDarkTheme) {
      setThemeMode("dark");
    } else {
      setThemeMode("");
    }
  }, [isDarkTheme, themeMode]);

  // const handleLoginData = async (user: UserProps) => {
  //   // await Api.addUser(newUser);
  //   setUser(user);
  // };

  // useEffect(() => {
  //   let newUser = {
  //     id: "3bfb0142-88a8-4c3e-955f-049a6da89d26",
  //     name: "Vitor",
  //     avatar: "https://avatars.githubusercontent.com/u/47868559?v=4",
  //   };
  //   // if (user !== null) {
  //   //   let user = Api.onChatList(user.id, setChatList);
  //   //   return user;
  //   // }
  //   handleLoginData(newUser);
  // }, [user]);

  if (isLoading || !user) {
    return <Loading />;
  }

  return (
    <div
      className={`flex h-screen bg-light-backgroundSecond dark:bg-dark-backgroundSecond ${themeMode}`}
    >
      <div className="w-[35%] max-w-[415px] flex flex-col border-r border-r-light-border dark:border-r-dark-border">
        <NewChat
          chatList={chatList}
          user={user}
          show={showNewChat}
          setShow={setShowNewChat}
        />
        <header className="h-[60px] flex justify-between items-center px-4 py-0 max-[994px]:w-screen bg-light-backgroundSecond dark:bg-dark-backgroundSecond">
          <div className="flex justify-center items-center gap-2">
            {user.avatar ? (
              <Image
                width={40}
                height={40}
                className="rounded-full cursor-pointer"
                src={user.avatar}
                alt={`Foto do usuário ${user.name}`}
              />
            ) : (
              ""
            )}

            <p className="ml-1 text-light-text dark:text-dark-text">
              {user.name}
            </p>
          </div>
          <div className="flex">
            <div
              onClick={() => setIsDarkTheme(!isDarkTheme)}
              className="w-10 h-10 rounded-[20px] flex justify-center items-center cursor-pointer"
            >
              <DarkModeIcon style={{ color: "#919191" }} />
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
          </div>
        </header>

        <div className="bg-light-background dark:bg-dark-background px-4 py-1  max-[994px]:w-screen">
          <div className="bg-light-backgroundSecond dark:bg-dark-backgroundSecond h-10 rounded-[10px] flex items-center px-2 py-0">
            <SearchIcon fontSize="small" style={{ color: "#919191" }} />
            <input
              type="search"
              className="flex-1 border-0 outline-0 dark:border-0 dark:outline-0 rounded-[10px] -mr-2 bg-transparent ml-3 text-light-text dark:text-light-text"
              placeholder="Procurar ou iniciar uma nova dúvida."
            />
          </div>
        </div>

        <div className="flex-1 bg-light-background dark:bg-dark-background overflow-y-auto w-screen">
          {chatList.map((item, key) => (
            <ChatList
              key={key}
              data={item}
              active={activeChat.chatId === chatList[key].chatId}
              onClick={() => setActiveChat(chatList[key])}
              onMobileClick={() => setMobileOpen(true)}
            />
          ))}
        </div>
      </div>
      <div className="flex-1 h-screen">
        {activeChat.chatId !== undefined && (
          <ChatWindow
            user={user}
            data={activeChat}
            setMobileOpen={setMobileOpen}
            mobileOpen={mobileOpen}
          />
        )}

        {activeChat.chatId === undefined && <ChatIntro />}
      </div>
    </div>
  );
}

export default App;
