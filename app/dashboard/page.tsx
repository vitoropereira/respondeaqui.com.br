import { useRouter } from 'next/navigation'

import getCurrentUser from '../actions/getCurrentUser'
import ClientOnly from '../components/ClientOnly'
import { ChatProps } from '../@types/chatType'
import Dashboard from '../components/dashboard/Dashboard'

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

  const router = useRouter()

  if (!currentUser) {
    router.push('../')
    return
  }

  return (
    <ClientOnly>
      <Dashboard currentUser={currentUser} />
    </ClientOnly>
  )
}

export default App
