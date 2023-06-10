import { PrismaMessageRepository } from '@/app/repositories/prisma/prismaMessageRepository'
import { NextResponse } from 'next/server'

interface IParams {
  chatId: string
}

export async function GET({ params }: { params: IParams }) {
  const { chatId } = params

  const prismaMessageRepository = new PrismaMessageRepository()

  const res = await prismaMessageRepository.getMessagesByChatId(chatId)

  return NextResponse.json(res)
}
