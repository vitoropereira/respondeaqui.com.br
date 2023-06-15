import { PrismaChatsRepository } from '@/src/repositories/prisma/prismaChatsRepository'
import { NextResponse } from 'next/server'

interface IParams {
  userId: string
}

export async function GET(request: Request, { params }: { params: IParams }) {
  const { userId } = params

  const prismaChatsRepository = new PrismaChatsRepository()

  const res = await prismaChatsRepository.findChatByUserId(userId)

  return NextResponse.json(res)
}
