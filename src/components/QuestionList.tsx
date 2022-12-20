import Image from "next/image";
import { useEffect, useState } from "react";
import {
  getRelativeTime,
  lastMessageTime,
  limitText,
} from "src/utils/generalFunctions";

interface QuestionLists {
  id: string;
  content: string;
  userId: string;
  created_at: string;
  updated_at: string;
  user: User;
}

interface User {
  id: string;
  username: string;
  email: string;
  signInMethod: string[];
  features: string[];
  avatarURL: string;
  created_at: string;
  updated_at: string;
}

interface QuestionListProps {
  onClick: () => void;
  active: boolean;
  data: QuestionLists;
  onMobileClick: () => void;
}

export function QuestionList({
  onClick,
  active,
  data,
  onMobileClick,
}: QuestionListProps) {
  const [time, setTime] = useState("");

  useEffect(() => {
    let messageDate = new Date(data.updated_at);
    const updatedTime = getRelativeTime(messageDate);
    setTime(updatedTime);
  }, [data]);

  return (
    <div onClick={onMobileClick}>
      <div
        className="flex cursor-pointer items-center h-[70px] hover:bg-light-backgroundHover hover:dark:bg-dark-backgroundHover active:bg-light-backgroundActive active:dark:bg-dark-backgroundActive pl-2"
        onClick={onClick}
      >
        <Image
          className="rounded-full ml-3"
          width="50px"
          height="50px"
          src={data.user.avatarURL}
          alt=""
        />
        <div
          className="flex-1 h-full flex flex-col justify-center
         border-b-light-border dark:border-b-dark-text 
         pr-4 ml-2 flex-wrap min-w-0"
        >
          <div className="flex justify-between items-center w-full">
            <div className="text-base text-light-text dark:text-dark-text pl-1 flex flex-col justify-start items-start ">
              <span>{limitText(data.content, 35)}</span>
              <span className="text-xs font-thin ml-1">
                Por: {data.user.username}
              </span>
            </div>
            <div className="text-xs text-light-lastMessage dark:text-dark-lastMessage">
              {time}
            </div>
          </div>
          <div className="flex justify-between items-center w-full">
            <div className="text-sm text-light-lastMessage dark:text-dark-lastMessage flex w-full mb-2">
              <p className="overflow-hidden whitespace-nowrap overflow-ellipsis m-0">
                {data.content}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
