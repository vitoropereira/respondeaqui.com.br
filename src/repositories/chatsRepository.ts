import { Chat } from '@prisma/client'

interface ChatsProps {
  content: string
  user_id: string
}

export interface ChatsRepository {
  createChat: (ChatsData: ChatsProps) => Promise<Chat>
  findChatByText: (text: string) => Promise<boolean>
  findChatByUserId: (user_id: string) => Promise<Chat[]>
  findAllChats: () => Promise<Chat[]>
}
