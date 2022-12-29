import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import Image from "next/image";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { Input } from "./Input";
import { Loading } from "./Loading";
import { useSession, signOut } from "next-auth/react";
import { ShowErrors } from "./ShowErrors";

interface NewChatProps {
  show: boolean;
  setShow: (show: boolean) => void;
}

export interface ChatLists {
  id: string;
  content: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  user: User;
}

interface User {
  id: string;
  username: string;
  email: string;
  signInMethod: string[];
  avatar_url: string;
  created_at: string;
  updated_at: string;
}

export function NewChat({ show, setShow }: NewChatProps) {
  const [newChat, setNewChat] = useState("");
  const [listChat, setListChat] = useState<ChatLists[]>();
  const [globalErrorMessage, setGlobalErrorMessage] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [errorObject, setErrorObject] = useState(undefined);

  const session = useSession();

  const handleNewChatChange = async (event: ChangeEvent<HTMLInputElement>) => {
    event.target.setCustomValidity("");
    setNewChat(event.target.value);
  };

  const handleCreateNewChat = async (event: FormEvent) => {
    setIsLoading(true);
    event.preventDefault();

    try {
      const fullQuestion = {
        content: newChat,
        user_id: session.data.user.id,
        features: session.data.user.features,
      };

      const response = await fetch(`/api/v1/chats`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fullQuestion),
      });

      setGlobalErrorMessage(undefined);

      const responseBody = await response.json();

      if (response.status === 201) {
        setNewChat("");
        setIsLoading(false);
        setListChat([responseBody, ...listChat]);
        return;
      }

      if (response.status === 400) {
        setErrorObject(responseBody);
        setIsLoading(false);
        return;
      }

      if (response.status >= 401) {
        setGlobalErrorMessage(`${responseBody.message} ${responseBody.action}`);
        setIsLoading(false);
        setInterval(() => {
          signOut();
        }, 5000);
        return;
      }
    } catch (error) {
      console.log("error");
      console.log(error);
      setGlobalErrorMessage(
        "Não foi possível se conectar ao Responde Aqui. Por favor, verifique sua conexão."
      );
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setShow(false);
  };

  async function getAllChatByUser(user_id: string) {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/v1/chats/${user_id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      setGlobalErrorMessage(undefined);

      const responseBody = await response.json();

      if (response.status === 200) {
        console.log("responseBody");
        console.log(responseBody);
        setIsLoading(false);
        setListChat(responseBody);
        return;
      }

      if (response.status === 400) {
        setErrorObject(responseBody);
        setIsLoading(false);
        return;
      }

      if (response.status >= 401) {
        setGlobalErrorMessage(`${responseBody.message} ${responseBody.action}`);
        setIsLoading(false);
        return;
      }
    } catch (error) {
      console.log("error");
      console.log(error);
      setGlobalErrorMessage(
        "Não foi possível se conectar ao Responde Aqui. Por favor, verifique sua conexão."
      );
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getAllChatByUser(session.data.user.id);
  }, [session.data.user.id]);

  return (
    <div
      className="w-[35%] max-w-[415px] fixed left-0 top-0 bottom-0 
      max-[994px]:w-full max-[994px]:h-full z-10
      bg-light-background dark:bg-dark-background 
      flex flex-col border-r-[1px] border-r-light-border dark:border-r-dark-border transition-all ease-linear"
      style={{ left: show ? 0 : -420 }}
    >
      <div className="flex bg-brand-500 items-center pt-[10px] pr-[15px] pb-[15px] pl-[15px]">
        <div
          onClick={handleClose}
          className="w-10 h-10 flex justify-center items-center cursor-pointer"
        >
          <ArrowBackIcon style={{ color: "#FFF" }} />
        </div>
        <h2 className="text-lg h-10 leading-10 flex-1 font-bold text-white ml-5">
          Seus Chats
        </h2>
      </div>
      <div className="flex-1 overflow-y-auto min-h-48  max-h-40">
        <p className="px-4 py-2 pl-6 mt-1 text-base font-bold dark:text-dark-text text-light-text">
          Criar novo Chat
        </p>
        <Input
          placeholderText="Digite o tema do Chat."
          onChange={handleNewChatChange}
          value={newChat}
          icon={false}
        />
        <div className="px-4 py-1">
          <div className="h-10 rounded-[10px] flex items-center px-1 py-0">
            <button
              type="submit"
              className="py-1 px-2 w-full 
                        bg-brand-500 dark:bg-light-chatBackground 
                        hover:bg-dark-backgroundHover dark:hover:bg-light-backgroundHover 
                        text-dark-text dark:text-light-text  
                        transition ease-in duration-200 text-center text-base font-semibold shadow-md 
                        focus:outline-none 
                        rounded-lg "
              disabled={isLoading}
              onClick={handleCreateNewChat}
            >
              {isLoading ? <Loading size={8} /> : "Criar chat"}
            </button>
          </div>

          {errorObject && <ShowErrors message={errorObject.message} />}
          {globalErrorMessage && <ShowErrors message={globalErrorMessage} />}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {listChat &&
          listChat.map((item) => {
            return (
              <div
                className="flex items-center p-4 cursor-pointer hover:bg-light-backgroundHover dark:hover:bg-dark-backgroundHover"
                key={item.id}
              >
                <Image
                  width={50}
                  height={50}
                  className="rounded-full mr-4"
                  alt="Imagem do usuário."
                  src={item.user.avatar_url}
                />
                <div className="text-base text-light-text dark:text-dark-text pl-1 flex flex-col justify-start items-start ">
                  <span>{item.content}</span>
                  <span className="text-xs font-thin ml-1">
                    {item.user.username}
                  </span>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
