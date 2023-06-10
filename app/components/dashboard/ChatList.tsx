'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ChatProps } from 'app/@types/chatType'
import { limitText } from '@/app/utils/generalFunctions'

interface ChatListProps {
  onClick: () => void
  active: boolean
  data: ChatProps
  onMobileClick: () => void
}

export function ChatList({
  onClick,
  active,
  data,
  onMobileClick,
}: ChatListProps) {
  const [time, setTime] = useState('')

  // useEffect(() => {
  //   let messageDate: Date
  //   if (data.message.length > 0) {
  //     messageDate = new Date(data.message[data.message.length - 1].created_at)
  //   } else {
  //     messageDate = new Date(data.updated_at)
  //   }
  //   const updatedTime = getRelativeTime(messageDate)
  //   setTime(updatedTime)
  // }, [data])

  return (
    <div onClick={onMobileClick}>
      <div
        className={`flex h-[70px] cursor-pointer items-center pl-2 hover:bg-light-backgroundHover  hover:dark:bg-dark-backgroundHover ${
          active && 'bg-light-backgroundActive dark:bg-dark-backgroundActive'
        }`}
        onClick={onClick}
      >
        {data.user.avatar_url && (
          <Image
            className="ml-3 rounded-full"
            width="50"
            height="50"
            src={data.user.avatar_url}
            alt=""
          />
        )}
        <div
          className="ml-2 flex h-full min-w-0 flex-1
         flex-col flex-wrap 
         justify-center border-b-light-border pr-4 dark:border-b-dark-text"
        >
          <div className="flex w-full items-center justify-between">
            <div className="flex flex-col items-start justify-start pl-1 text-base text-light-text dark:text-dark-text ">
              <span>{limitText(data.content, 30)}</span>
              <span className="ml-1 font-mono text-xs text-light-lastMessage dark:text-dark-lastMessage">
                Por: {data.user.username}
              </span>
            </div>
            <div className="text-xs text-light-lastMessage dark:text-dark-lastMessage">
              {time}
            </div>
          </div>
          <div className="flex w-full items-center justify-between">
            <div className="mb-2 flex w-full text-[10px] text-light-lastMessage dark:text-dark-lastMessage">
              <p className="ml-1 overflow-hidden overflow-ellipsis whitespace-nowrap">
                {data.message.length > 0 &&
                data.user_id === data.message[0].user_id
                  ? 'Você: '
                  : ''}
                {data.message.length > 0
                  ? limitText(data.message[0].content, 25)
                  : '...'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
