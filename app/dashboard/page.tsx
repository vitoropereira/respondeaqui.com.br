import getCurrentUser from '../actions/getCurrentUser'
import ClientOnly from '../components/ClientOnly'
import { ChatProps } from '../@types/chatType'
import Home from '../page'
import Aside from '../components/dashboard/Aside'
import Tutorial from '../components/dashboard/Tutorial'
import { Input } from '../components/Input'
import Chats from '../components/dashboard/Chats'
import DashboardHeader from '../components/dashboard/DashboardHeader'
import { ChatWindow } from '../components/dashboard/ChatWindow'

type DataProp = ChatProps & {
  name?: string
  message?: string
  action?: string
  statusCode?: number
  errorId?: string
  requestId?: string
}

const App = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return <Home />
  }

  return (
    <div
      className={`flex h-screen bg-light-backgroundSecond dark:bg-dark-backgroundSecond`}
    >
      <div
        className={`flex w-[35%]
                  max-w-[415px] flex-col border-r
                  border-r-light-border dark:border-r-dark-border
                  max-[994px]:fixed max-[994px]:z-10 
                  max-[994px]:h-full max-[994px]:w-screen max-[994px]:flex-1`}
      >
        <Aside currentUser={currentUser} />

        {currentUser.tutorial_steps <= 1 && (
          <Tutorial
            tutorialSteps={currentUser.tutorial_steps}
            currentUser={currentUser}
          />
        )}

        <DashboardHeader currentUser={currentUser} />

        <Input placeholderText="Procurar por uma pergunta." icon={true} />

        <div className="flex-1 overflow-y-auto bg-light-background dark:bg-dark-background max-[994px]:w-screen">
          <Chats />
        </div>
      </div>

      <div className="h-screen flex-1">
        <ChatWindow />
      </div>
    </div>
  )
}

export default App
