import Image from 'next/image'
import { useEffect, useState } from 'react'

export function ChatList({onClick, active, data, onMobileClick}) {
  const [time, setTime] = useState('')

  useEffect(() => {
    if(data.lastMessageDate > 0) {
      let d = new Date(data.lastMessageDate.seconds * 1000) 
      let hours = d.getHours()
      let minutes = d.getMinutes()

      hours = hours < 10 ? '0'+hours : hours
      minutes = minutes < 10 ? '0'+minutes : minutes
      setTime(`${hours}:${minutes}`)
    }
  }, [data])

  return (
    <div onClick={onMobileClick}>
      <div className="flex cursor-pointer items-center h-[70px] hover:bg-light-backgroundHover hover:dark:bg-dark-backgroundHover active:bg-light-backgroundActive active:dark:bg-dark-backgroundActive" onClick={onClick}>
      <Image className='rounded-full ml-4' width="50px" height="50px" src={data.image} alt=""/>
      <div className='flex-1 h-full flex flex-col justify-center border-b-light-border dark:border-b-dark-text pr-4 ml-4 flex-wrap min-w-0'>
        <div className="flex justify-between items-center w-full">
          <div className="text-lg text-light-text dark:text-dark-text">{data.title}</div>
          <div className='text-xs text-light-lastMessage dark:text-dark-lastMessage'>{time}</div>
        </div>
        <div className='flex justify-between items-center w-full'>
          <div className='text-sm text-light-lastMessage dark:text-dark-lastMessage flex w-full mb-2'>
            <p className='overflow-hidden whitespace-nowrap overflow-ellipsis m-0'>{data.lastMessage}</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
