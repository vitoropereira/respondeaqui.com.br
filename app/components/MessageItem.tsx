import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MessageProps } from "app/@types/messageTypes";

interface MessageItemProps {
  messageData: MessageProps;
}

export function MessageItem({ messageData }: MessageItemProps) {
  const [time, setTime] = useState("");

  const session = useSession();

  useEffect(() => {
    let d = new Date(messageData.created_at);
    let hours = String(d.getHours()).padStart(2, "0");
    let minutes = String(d.getMinutes()).padStart(2, "0");

    setTime(`${hours}:${minutes}`);
  }, [messageData]);

  const isAuthor = session.data.user.id === messageData.user_id;

  return (
    <div
      className={`flex mb-3`}
      style={{
        justifyContent: isAuthor ? "flex-end" : "flex-start",
      }}
    >
      <div>
        {isAuthor ? (
          ""
        ) : (
          <Image
            width={40}
            height={40}
            className="rounded-[50%]"
            src={messageData.user.avatar_url}
            alt={`Foto do usuário ${messageData.user.username}`}
          />
        )}
      </div>

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
          {messageData.content}
        </div>
        <div className="text-xs text-gray-500 mr-1 text-right h-4 -mt-4">
          {time}
        </div>
      </div>
      <div>
        {isAuthor ? (
          <Image
            width={40}
            height={40}
            className="rounded-[50%]"
            src={messageData.user.avatar_url}
            alt={`Foto do usuário ${messageData.user.username}`}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
