import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

export interface Question {
  id: string;
  content: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface ChatLists {
  id: string;
  content: string;
  question_id: string;
  user_id: string;
  created_at: Date;
  user: User;
  question: Question;
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

interface MessageItemProps {
  chatData: ChatLists;
}

export function MessageItem({ chatData }: MessageItemProps) {
  const [time, setTime] = useState("");

  const session = useSession();

  useEffect(() => {
    let d = new Date(chatData.created_at);
    let hours = String(d.getHours()).padStart(2, "0");
    let minutes = String(d.getMinutes()).padStart(2, "0");

    setTime(`${hours}:${minutes}`);
  }, [chatData]);

  const isAuthor = session.data.user.id === chatData.user_id;

  return (
    <div
      className={`flex mb-3`}
      style={{
        justifyContent: isAuthor ? "flex-end" : "flex-start",
      }}
    >
      {isAuthor ? (
        ""
      ) : (
        <Image
          width={40}
          height={40}
          className="rounded-[50%]"
          src={chatData.user.avatar_url}
          alt={`Foto do usuário ${chatData.user.username}`}
        />
      )}

      <div
        className={`flex flex-col p-1 max-w-[90%]  ${
          isAuthor
            ? "rounded-tl-xl rounded-bl-xl rounded-br-xl mr-3"
            : "rounded-tr-xl rounded-br-xl rounded-bl-xl ml-3"
        }`}
        style={{
          backgroundColor: isAuthor ? "#D9FDD3" : "#FFF",
        }}
      >
        <div className="text-sm mt-1 mr-10 mb-1 ml-1 text-light-textSecondary dark:text-dark-textSecondary">
          {chatData.content}
        </div>
        <div className="text-xs text-gray-500 mr-1 text-right h-4 -mt-4">
          {time}
        </div>
      </div>
      {isAuthor ? (
        <Image
          width={40}
          height={40}
          className="rounded-[50%]"
          src={chatData.user.avatar_url}
          alt={`Foto do usuário ${chatData.user.username}`}
        />
      ) : (
        ""
      )}
    </div>
  );
}
