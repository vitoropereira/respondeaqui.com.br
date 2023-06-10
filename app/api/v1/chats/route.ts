import { PrismaChatsRepository } from '@/app/repositories/prisma/prismaChatsRepository'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const prismaChatsRepository = new PrismaChatsRepository()

  const body = await request.json()

  const newChat = await prismaChatsRepository.createChat(body)

  return NextResponse.json(newChat)
}

export async function GET(request: Request) {
  const prismaChatsRepository = new PrismaChatsRepository()

  const allChats = await prismaChatsRepository.findAllChats()

  return NextResponse.json(allChats)
}
