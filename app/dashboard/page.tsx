'use client'

import { useState, useEffect } from 'react'
import { signOut } from 'next-auth/react'
import useSWR from 'swr'
import ChatIcon from '@mui/icons-material/Chat'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LogoutIcon from '@mui/icons-material/Logout'

import { ChatProps } from 'app/@types/chatType'
import { useRouter } from 'next/navigation'
import getCurrentUser from '../actions/getCurrentUser'
import { NewChat } from '../components/NewChat'
import { ToolTip } from '../components/Tooltip'
import { Input } from '../components/Input'
import { ShowErrors } from '../components/ShowErrors'
import { ChatList } from '../components/ChatList'
import { ChatWindow } from '../components/ChatWindow'
import { ChatIntro } from '../components/ChatIntro'
import Tutorial from '../components/Tutorial'

type DataProp = ChatProps & {
  name?: string
  message?: string
  action?: string
  statusCode?: number
  errorId?: string
  requestId?: string
}

const Dashboard = async () => {
  const currentUser = await getCurrentUser()

  const [activeChat, setActiveChat] = useState<ChatProps | undefined>(undefined)
  const [showNewChat, setShowNewChat] = useState(false)
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const [themeMode, setThemeMode] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [allChats, setAllChats] = useState<ChatProps[]>()
  const [globalErrorMessage, setGlobalErrorMessage] = useState<
    string | undefined
  >(undefined)
  const [tutorialSteps, setTutorialSteps] = useState<number>(0)

  const { data } = useSWR<DataProp[]>(`/api/v1/chats/`, {
    refreshInterval: 1000,
  })

  // useEffect(() => {
  //   if (data) {
  //     if (data[0]?.statusCode >= 400) {
  //       setGlobalErrorMessage(`${data[0].message} ${data[0].action}`)
  //       return
  //     }
  //     setAllChats(data)
  //   }
  // }, [allChats, data])

  const router = useRouter()

  function handleWithSetMobileOpen() {
    setMobileOpen(!mobileOpen)
  }

  const handleNewChat = () => {
    setShowNewChat(true)
  }

  const handleShowChat = (chatId: string) => {
    router.push(`dashboard/${chatId}`)
  }

  const handleMakeTutorial = (tutorialSteps: number) => {
    setTutorialSteps(tutorialSteps)
  }

  useEffect(() => {
    if (isDarkTheme) {
      setThemeMode('dark')
    } else {
      setThemeMode('')
    }
  }, [isDarkTheme, themeMode])

  // if (!currentUser) {
  //   return <Loading />
  // }

  return (
    <div
      className={`${themeMode} flex h-screen bg-light-backgroundSecond dark:bg-dark-backgroundSecond`}
    >
      <div
        className={`flex w-[35%]
                  max-w-[415px] flex-col border-r
                  border-r-light-border dark:border-r-dark-border
                  max-[994px]:fixed max-[994px]:z-10 
                  max-[994px]:h-full max-[994px]:w-screen max-[994px]:flex-1`}
      >
        <NewChat
          show={showNewChat}
          setShow={setShowNewChat}
          currentUser={currentUser}
        />
        {tutorialSteps <= 1 && (
          <Tutorial
            tutorialSteps={tutorialSteps}
            handleMakeTutorial={handleMakeTutorial}
            currentUser={currentUser}
          />
        )}

        <header className="flex h-[60px] items-center justify-between bg-light-backgroundSecond px-4 py-0 dark:bg-dark-backgroundSecond max-[994px]:w-screen">
          <div className="flex items-center justify-center gap-2">
            {/* {session.data?.user.avatar_url ? (
              <Image
                width={40}
                height={40}
                className="cursor-pointer rounded-full"
                src={session.data.user.avatar_url}
                alt={`Foto do usuário ${session.data.user.username}`}
              />
            ) : (
              ''
            )} */}

            <p className="ml-1 text-light-text dark:text-dark-text">
              {/* {session.data.user.username} */}
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

        <div className="flex-1 overflow-y-auto bg-light-background dark:bg-dark-background max-[994px]:w-screen">
          {allChats &&
            allChats.map((item) => {
              return (
                <ChatList
                  key={item.id}
                  data={item}
                  active={activeChat?.id === item.id}
                  onClick={() => handleShowChat(item.id)}
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
            currentUser={currentUser}
          />
        )}

        {activeChat === undefined && <ChatIntro />}
      </div>
    </div>
  )
}

export default Dashboard

// export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
//   const session = await unstable_getServerSession(
//     req,
//     res,
//     buildNextAuthOptions(req, res),
//   )
//   return {
//     props: {
//       session,
//     },
//   }
// }
