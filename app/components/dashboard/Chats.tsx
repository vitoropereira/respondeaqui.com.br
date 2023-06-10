import fetchChats from '@/app/actions/getChats'
import { EmptyChatList } from './EmptyChatList'

export default async function Chats() {
  const allChats = await fetchChats()

  if (allChats.length === 0) {
    return <EmptyChatList />
  }

  return (
    allChats &&
    allChats.map((item) => {
      console.log(item)
      return <span key={item.id}>ALgum texto</span>
    })
  )
}
