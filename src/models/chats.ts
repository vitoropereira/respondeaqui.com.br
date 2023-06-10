import { PrismaChatsRepository } from 'src/repositories/prisma/prismaChatsRepository'

interface ChatProps {
  content: string
  user_id: string
}

export class Chats {
  constructor(private prismaChatsRepository: PrismaChatsRepository) {}
  async createChat(chatData: ChatProps) {
    const { content, user_id } = chatData
    try {
      const saveChat = await this.prismaChatsRepository.createChat({
        content,
        user_id,
      })
      return saveChat
    } catch (e) {
      console.error('Error createChat: ', e)
      return false
    }
  }

  async filterChatsByText(text: string) {
    const chats = this.prismaChatsRepository.findChatByText(text)
  }

  async getChatsByUserId(user_id: string) {
    try {
      const userChats = await this.prismaChatsRepository.findChatByUserId(
        user_id,
      )
      return userChats
    } catch (e) {
      console.error('Error getChats: ', e)
      return false
    }
  }

  async getAllChats() {
    try {
      const Chats = await this.prismaChatsRepository.findAllChats()
      return Chats
    } catch (e) {
      console.error('Error getChats: ', e)
      return false
    }
  }
}
