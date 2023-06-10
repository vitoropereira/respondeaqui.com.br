import { useState, FormEvent, ChangeEvent } from 'react'
import Image from 'next/image'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import { Input } from './Input'
import { Loading } from './Loading'
import { useSession, signOut } from 'next-auth/react'
import { ShowErrors } from './ShowErrors'
import { SafeUser } from '../@types/next-auth'
import { useRouter } from 'next/router'

interface NewChatProps {
  show: boolean
  setShow: (show: boolean) => void
  currentUser: SafeUser
}

export interface ChatLists {
  id: string
  content: string
  user_id: string
  created_at: string
  updated_at: string
  user: SafeUser
}

export function NewChat({ show, setShow, currentUser }: NewChatProps) {
  const [newChat, setNewChat] = useState('')
  const [listChat, setListChat] = useState<ChatLists[]>([])
  const [globalErrorMessage, setGlobalErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorObject, setErrorObject] = useState(undefined)

  const router = useRouter()

  const handleNewChatChange = async (event: ChangeEvent<HTMLInputElement>) => {
    event.target.setCustomValidity('')
    setNewChat(event.target.value)
  }

  const handleCreateNewChat = async (event: FormEvent) => {
    setIsLoading(true)
    event.preventDefault()

    try {
      if (!currentUser) {
        alert('Usuário não logado!')
        router.push('../')
        return
      }

      const fullQuestion = {
        content: newChat,
        user_id: currentUser.id,
        // features: session.data.user.features,
      }

      const response = await fetch(`/api/v1/chats`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fullQuestion),
      })

      setGlobalErrorMessage('')

      const responseBody = await response.json()
      console.log('responseBody')
      console.log(responseBody)
      if (response.status === 201) {
        setNewChat('')
        setIsLoading(false)
        setListChat([responseBody, ...listChat])
        return
      }

      if (response.status === 400) {
        setErrorObject(responseBody)
        setIsLoading(false)
        return
      }

      if (response.status >= 401) {
        setGlobalErrorMessage(`${responseBody.message} ${responseBody.action}`)
        setIsLoading(false)
        setInterval(() => {
          signOut()
        }, 5000)
        return
      }
    } catch (error) {
      console.log('error')
      console.log(error)
      setGlobalErrorMessage(
        'Não foi possível se conectar ao Responde Aqui. Por favor, verifique sua conexão.',
      )
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setShow(false)
  }

  async function getAllChatByUser(user_id: string) {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/v1/chats/${user_id}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })

      setGlobalErrorMessage('')

      const responseBody = await response.json()

      if (response.status === 200) {
        console.log('responseBody')
        console.log(responseBody)
        setIsLoading(false)
        setListChat(responseBody)
        return
      }

      if (response.status === 400) {
        setErrorObject(responseBody)
        setIsLoading(false)
        return
      }

      if (response.status >= 401) {
        setGlobalErrorMessage(`${responseBody.message} ${responseBody.action}`)
        setIsLoading(false)
        return
      }
    } catch (error) {
      console.log('error')
      console.log(error)
      setGlobalErrorMessage(
        'Não foi possível se conectar ao Responde Aqui. Por favor, verifique sua conexão.',
      )
      setIsLoading(false)
    }
  }
  console.log('listChat')
  console.log(listChat)
  return (
    <div
      className="fixed bottom-0 left-0 top-0 z-10 flex 
      w-[35%] max-w-[415px] flex-col
      border-r-[1px] border-r-light-border 
      bg-light-background transition-all ease-linear dark:border-r-dark-border dark:bg-dark-background max-[994px]:h-full max-[994px]:w-full"
      style={{ left: show ? 0 : -420 }}
    >
      <div className="flex items-center bg-brand-500 pb-[15px] pl-[15px] pr-[15px] pt-[10px]">
        <div
          onClick={handleClose}
          className="flex h-10 w-10 cursor-pointer items-center justify-center"
        >
          <ArrowBackIcon style={{ color: '#FFF' }} />
        </div>
        <h2 className="ml-5 h-10 flex-1 text-lg font-bold leading-10 text-white">
          Seus Chats
        </h2>
      </div>
      <div className="min-h-48 max-h-40 flex-1  overflow-y-auto">
        <p className="mt-1 px-4 py-2 pl-6 text-base font-bold text-light-text dark:text-dark-text">
          Criar novo Chat
        </p>
        <Input
          placeholderText="Digite o tema do Chat."
          onChange={handleNewChatChange}
          value={newChat}
          icon={false}
        />
        <div className="px-4 py-1">
          <div className="flex h-10 items-center rounded-[10px] px-1 py-0">
            <button
              type="submit"
              className="w-full rounded-lg bg-brand-500 
                        px-2 py-1 
                        text-center text-base 
                        font-semibold text-dark-text  
                        shadow-md transition duration-200 ease-in hover:bg-dark-backgroundHover focus:outline-none dark:bg-light-chatBackground 
                        dark:text-light-text 
                        dark:hover:bg-light-backgroundHover "
              disabled={isLoading}
              onClick={handleCreateNewChat}
            >
              {isLoading ? <Loading size={8} /> : 'Criar chat'}
            </button>
          </div>

          {errorObject && <ShowErrors message={errorObject} />}
          {globalErrorMessage && <ShowErrors message={globalErrorMessage} />}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {listChat &&
          listChat.map((item) => {
            console.log('item.user.image')

            console.log(item)

            return (
              <div
                className="flex cursor-pointer items-center p-4 hover:bg-light-backgroundHover dark:hover:bg-dark-backgroundHover"
                key={item.id}
              >
                {!!item.user.image && (
                  <Image
                    width={50}
                    height={50}
                    className="mr-4 rounded-full"
                    alt="Imagem do usuário."
                    src={item.user.image}
                  />
                )}

                <div className="flex flex-col items-start justify-start pl-1 text-base text-light-text dark:text-dark-text ">
                  <span>{item.content}</span>
                  <span className="ml-1 text-xs font-thin">
                    {item.user.name}
                  </span>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}
