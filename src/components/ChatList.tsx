import Image from "next/image";
import { useEffect, useState } from "react";
import { ChatProps } from "src/@types/chatType";
import {
  createScrollingText,
  getRelativeTime,
  limitText,
} from "src/utils/generalFunctions";

interface ChatListProps {
  onClick: () => void;
  active: boolean;
  data: ChatProps;
  onMobileClick: () => void;
}

export function ChatList({
  onClick,
  active,
  data,
  onMobileClick,
}: ChatListProps) {
  const [time, setTime] = useState("");

  useEffect(() => {
    let messageDate: Date;
    if (data.message.length > 0) {
      messageDate = new Date(data.message[data.message.length - 1].created_at);
    } else {
      messageDate = new Date(data.updated_at);
    }
    const updatedTime = getRelativeTime(messageDate);
    setTime(updatedTime);
  }, [data]);

  return (
    <div onClick={onMobileClick}>
      <div
        className={`flex cursor-pointer items-center h-[70px] hover:bg-light-backgroundHover hover:dark:bg-dark-backgroundHover  pl-2 ${
          active && "bg-light-backgroundActive dark:bg-dark-backgroundActive"
        }`}
        onClick={onClick}
      >
        <Image
          className="rounded-full ml-3"
          width="50px"
          height="50px"
          src={data.user.avatar_url}
          alt=""
        />
        <div
          className="flex-1 h-full flex flex-col justify-center
         border-b-light-border dark:border-b-dark-text 
         pr-4 ml-2 flex-wrap min-w-0"
        >
          <div className="flex justify-between items-center w-full">
            <div className="text-base text-light-text dark:text-dark-text pl-1 flex flex-col justify-start items-start ">
              <span>{limitText(data.content, 30)}</span>
              <span className="text-xs text-light-lastMessage dark:text-dark-lastMessage font-mono ml-1">
                Por: {data.user.username}
              </span>
            </div>
            <div className="text-xs text-light-lastMessage dark:text-dark-lastMessage">
              {time}
            </div>
          </div>
          <div className="flex justify-between items-center w-full">
            <div className="text-[10px] text-light-lastMessage dark:text-dark-lastMessage flex w-full mb-2">
              <p className="overflow-hidden whitespace-nowrap overflow-ellipsis ml-1">
                {data.message.length > 0 &&
                data.user_id === data.message[0].user_id
                  ? "Você: "
                  : ""}
                {data.message.length > 0
                  ? limitText(data.message[0].content, 25)
                  : "..."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
