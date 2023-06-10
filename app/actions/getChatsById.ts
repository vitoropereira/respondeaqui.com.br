import { PrismaChatsRepository } from '../repositories/prisma/prismaChatsRepository'

export default async function getChatById(id: string) {
  const prismaChatsRepository = new PrismaChatsRepository()

  const allChats = await prismaChatsRepository.findAllChats()

  const safeListings = allChats.map((chat) => ({
    ...chat,
    createdAt: chat.created_at.toISOString(),
    updatedAt: chat.updated_at.toISOString(),
  }))

  return safeListings
}
