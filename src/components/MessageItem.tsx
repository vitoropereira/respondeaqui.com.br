import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { MessageProps } from 'src/@types/messageTypes'
import { SafeUser } from '../@types/next-auth'

interface MessageItemProps {
  messageData: MessageProps
  currentUser: SafeUser
}

export function MessageItem({ messageData, currentUser }: MessageItemProps) {
  const [time, setTime] = useState('')

  const session = useSession()
  if (!session.data) {
    throw new Error('Usuário não esta logado!')
  }

  useEffect(() => {
    const d = new Date(messageData.created_at)
    const hours = String(d.getHours()).padStart(2, '0')
    const minutes = String(d.getMinutes()).padStart(2, '0')

    setTime(`${hours}:${minutes}`)
  }, [messageData])

  const isAuthor = currentUser.id === messageData.user_id

  return (
    <div
      className={`mb-3 flex`}
      style={{
        justifyContent: isAuthor ? 'flex-end' : 'flex-start',
      }}
    >
      <div>
        {isAuthor
          ? ''
          : messageData.user.image && (
              <Image
                width={40}
                height={40}
                className="rounded-[50%]"
                src={messageData.user.image}
                alt={`Foto do usuário ${messageData.user.name}`}
              />
            )}
      </div>

      <div
        className={`flex max-w-[90%] flex-col p-1  ${
          isAuthor
            ? 'mr-3 rounded-bl-xl rounded-br-xl rounded-tl-xl'
            : 'ml-3 rounded-bl-xl rounded-br-xl rounded-tr-xl'
        }`}
        style={{
          backgroundColor: isAuthor ? '#D9FDD3' : '#FFF',
        }}
      >
        <div className="mb-1 ml-1 mr-10 mt-1 text-sm text-light-textSecondary dark:text-dark-textSecondary">
          {messageData.content}
        </div>
        <div className="-mt-4 mr-1 h-4 text-right text-xs text-gray-500">
          {time}
        </div>
      </div>
      <div>
        {isAuthor
          ? messageData.user.image && (
              <Image
                width={40}
                height={40}
                className="rounded-[50%]"
                src={messageData.user.image}
                alt={`Foto do usuário ${messageData.user.name}`}
              />
            )
          : ''}
      </div>
    </div>
  )
}
