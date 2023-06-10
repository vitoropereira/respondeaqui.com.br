import { NextApiResponse } from 'next'

import { RequestProps } from 'src/models/controller'

import { Chats } from 'src/models/chats'
import { PrismaChatsRepository } from 'src/repositories/prisma/prismaChatsRepository'

export default async function handler(
  request: RequestProps,
  response: NextApiResponse,
) {
  if (request.method === 'POST') {
    const prismaChatsRepository = new PrismaChatsRepository()

    console.log('request.body')
    console.log(request.body)

    const newChat = await prismaChatsRepository.createChat(request.body)
    return response.status(201).json(newChat)
  }

  if (request.method === 'GET') {
    const prismaChatsRepository = new PrismaChatsRepository()
    const chat = new Chats(prismaChatsRepository)

    const allChats = await chat.getAllChats()

    return response.status(200).json(allChats)
  }

  return response.status(405)
}
