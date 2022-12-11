import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import ChatIcon from "@mui/icons-material/Chat";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SearchIcon from "@mui/icons-material/Search";

import { UserProps } from "../../repositories/user-repository";
import { NewChat } from "../../components/NewChat";
import { ChatList } from "../../components/ChatList";
import { ChatWindow } from "../../components/ChatWindow";

function App() {
  const [chatList, setChatList] = useState([]);
  const [activeChat, setActiveChat] = useState({
    chatId: "304ea09b-b85f-45b6-b63b-806c577cfe5b",
  });
  const [user, setUser] = useState({
    id: "3bfb0142-88a8-4c3e-955f-049a6da89d26",
    name: "Vitor",
    avatar: "https://avatars.githubusercontent.com/u/47868559?v=4",
  });
  const [showNewChat, setShowNewChat] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const route = useRouter();

  const handleNewChat = () => {
    setShowNewChat(true);
  };

  const handleLoginData = async (user: UserProps) => {
    // await Api.addUser(newUser);
    setUser(user);
  };

  useEffect(() => {
    let newUser = {
      id: "3bfb0142-88a8-4c3e-955f-049a6da89d26",
      name: "Vitor",
      avatar: "https://avatars.githubusercontent.com/u/47868559?v=4",
    };
    // if (user !== null) {
    //   let user = Api.onChatList(user.id, setChatList);
    //   return user;
    // }
    handleLoginData(newUser);
  }, [user]);
  console.log("user -=----");
  console.log(user);
  // if (!user) {
  //   return route.push("../login");
  // }

  return (
    <div className="flex h-screen bg-light-backgroundSecond dark:bg-dark-backgroundSecond">
      <div className="w-[35%] max-w-[415px] flex flex-col border-r border-r-light-border dark:border-r-dark-border">
        <NewChat
          chatList={chatList}
          user={user}
          show={showNewChat}
          setShow={setShowNewChat}
        />
        <header className="h-[60px] flex justify-between items-center px-0 py-4 w-screen">
          <div className="flex justify-center items-center gap-2">
            <Image
              width={40}
              height={40}
              className="rounded-full cursor-pointer"
              src={user.avatar}
              alt={`Foto do usuário ${user.name}`}
            />
            <p className="ml-1 text-light-text dark:text-light-text">
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
            >
              <ChatIcon style={{ color: "#919191" }} />
            </div>
          </div>
        </header>

        <div className="bg-light-background dark:bg-dark-background px-1 py-4 w-screen">
          <div className="bg-light-backgroundSecond dark:bg-light-backgroundSecond w-10 rounded-[40px] flex items-center px-0 py-2">
            <SearchIcon fontSize="small" style={{ color: "#919191" }} />
            <input
              type="search"
              className="flex-1 border-0 outline-0 bg-transparent ml-3 text-light-text dark:text-light-text"
              placeholder="Procurar ou começar uma nova conversa"
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

        {/* {activeChat.chatId === undefined && <ChatIntro />} */}
      </div>
    </div>
  );
}

export default App;
