import prisma from 'src/service/prisma'
import { ChatsRepository } from '../chatsRepository'

interface ChatProps {
  content: string
  user_id: string
}

export class PrismaChatsRepository implements ChatsRepository {
  async createChat({ content, user_id }: ChatProps) {
    const response = await prisma.chat.create({
      data: { content, user_id },
      include: {
        user: true,
      },
    })

    return response
  }

  async findChatByText(text: string) {
    return false
  }

  async findChatByUserId(user_id: string) {
    const Chats = await prisma.chat.findMany({
      where: {
        user_id,
      },
      include: {
        user: true,
        message: {
          orderBy: {
            created_at: 'desc',
          },
        },
      },
    })

    return Chats
  }

  async findAllChats() {
    const Chats = await prisma.chat.findMany({
      include: {
        user: true,
        message: {
          orderBy: {
            created_at: 'desc',
          },
        },
      },
    })

    return Chats
  }
}
