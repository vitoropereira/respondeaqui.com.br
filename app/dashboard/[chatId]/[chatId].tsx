import { useState, useEffect } from 'react'
import { unstable_getServerSession } from 'next-auth'
import { useSession, signOut } from 'next-auth/react'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import ChatIcon from '@mui/icons-material/Chat'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LogoutIcon from '@mui/icons-material/Logout'

import { Loading } from 'src/components/Loading'
import { ToolTip } from 'src/components/Tooltip'
import { ChatList } from 'src/components/ChatList'
import { ShowErrors } from 'src/components/ShowErrors'
import { ChatWindow } from 'src/components/ChatWindow'
import { ChatIntro } from 'src/components/ChatIntro'
import { NewChat } from 'src/components/NewChat'
import { Input } from 'src/components/Input'

import { buildNextAuthOptions } from '../api/auth/[...nextauth]'
import { ChatProps } from 'app/@types/chatType'
import webserver from 'src/service/webserver'
import { UserProps } from 'app/@types/userTypes'

const webserverHost = webserver.getHost()

type DataProp = ChatProps & {
  name?: string
  message?: string
  action?: string
  statusCode?: number
  errorId?: string
  requestId?: string
}

interface DashboardProps {
  sessions: UserProps
  receivedActivatedChat: ChatProps
}

function Dashboard({ sessions, receivedActivatedChat }: DashboardProps) {
  const [activeChat, setActiveChat] = useState<ChatProps>(receivedActivatedChat)
  const [showNewChat, setShowNewChat] = useState(false)
  const [isDarkTheme, setIsDarkTheme] = useState(true)
  const [themeMode, setThemeMode] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [allChats, setAllChats] = useState<ChatProps[]>()
  const [globalErrorMessage, setGlobalErrorMessage] =
    useState<string>(undefined)

  const { data } = useSWR<DataProp[]>(`/api/v1/chats/`, {
    refreshInterval: 1000,
  })

  useEffect(() => {
    if (data) {
      if (data[0]?.statusCode >= 400) {
        setGlobalErrorMessage(`${data[0].message} ${data[0].action}`)
        return
      }
      setAllChats(data)
    }
  }, [allChats, data])

  const session = useSession()
  const router = useRouter()

  const isSignedIn = session.status == 'authenticated'

  function handleWithSetMobileOpen() {
    setMobileOpen(!mobileOpen)
  }

  const handleNewChat = () => {
    setShowNewChat(true)
  }

  useEffect(() => {
    if (!isSignedIn) {
      router.push('../login')
    }
  }, [isSignedIn, router])

  useEffect(() => {
    if (isDarkTheme) {
      setThemeMode('dark')
    } else {
      setThemeMode('')
    }
  }, [isDarkTheme, themeMode])

  if (!isSignedIn) {
    return <Loading size={12} />
  }

  return (
    <div
      className={`${themeMode} flex h-screen bg-light-backgroundSecond dark:bg-dark-backgroundSecond`}
    >
      <div
        className="flex w-[35%] max-w-[415px] flex-col
              border-r border-r-light-border dark:border-r-dark-border 
              max-[994px]:w-full max-[994px]:max-w-full"
      >
        <NewChat show={showNewChat} setShow={setShowNewChat} />

        <header className="flex h-[60px] items-center justify-between bg-light-backgroundSecond px-4 py-0 dark:bg-dark-backgroundSecond">
          <div className="flex items-center justify-center gap-2">
            {session.data?.user.avatar_url ? (
              <Image
                width={40}
                height={40}
                className="cursor-pointer rounded-full"
                src={session.data.user.avatar_url}
                alt={`Foto do usuário ${session.data.user.username}`}
              />
            ) : (
              ''
            )}

            <p className="ml-1 text-light-text dark:text-dark-text">
              {session.data.user.username}
            </p>
          </div>
          <div className="flex">
            <div
              onClick={() => setIsDarkTheme(!isDarkTheme)}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-[20px]"
            >
              <ToolTip tooltip="Tema Dark/Light">
                <DarkModeIcon style={{ color: '#919191' }} />
              </ToolTip>
            </div>

            <div
              onClick={handleNewChat}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-[20px]"
              title="Fazer uma nova pergunta!"
            >
              <ToolTip tooltip="Clique para fazer uma nova pergunta!">
                <ChatIcon style={{ color: '#919191' }} />
              </ToolTip>
            </div>
            <div
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full"
              onClick={() => signOut()}
            >
              <ToolTip tooltip="Logout">
                <LogoutIcon style={{ color: '#919191' }} />
              </ToolTip>
            </div>
          </div>
        </header>

        <Input placeholderText="Procurar por uma pergunta." icon={true} />
        {globalErrorMessage && <ShowErrors message={globalErrorMessage} />}

        <div className="flex-1 overflow-y-auto bg-light-background dark:bg-dark-background">
          {allChats &&
            allChats.map((item) => {
              return (
                <ChatList
                  key={item.id}
                  data={item}
                  active={activeChat?.id === item.id}
                  onClick={() => setActiveChat(item)}
                  onMobileClick={() => setMobileOpen(true)}
                />
              )
            })}
        </div>
      </div>

      <div className="h-screen flex-1">
        {activeChat !== undefined && (
          <ChatWindow
            chatData={activeChat}
            handleWithSetMobileOpen={handleWithSetMobileOpen}
            mobileOpen={mobileOpen}
          />
        )}

        {activeChat === undefined && <ChatIntro />}
      </div>
    </div>
  )
}

export default Dashboard

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params,
}) => {
  const { chatId } = params

  const sessions = await unstable_getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )

  console.log(webserverHost)

  const response = await fetch(`${webserverHost}/api/v1/messages/${chatId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  const receivedActivatedChat = await response.json()
  console.log('receivedActivatedChat')
  console.log(receivedActivatedChat)
  return {
    props: {
      sessions,
      receivedActivatedChat,
    },
  }
}
