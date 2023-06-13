import { PrismaMessageRepository } from '@/src/repositories/prisma/prismaMessageRepository'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()

  const prismaMessageRepository = new PrismaMessageRepository()

  const newChat = await prismaMessageRepository.createMessage(body)

  return NextResponse.json(newChat)
}
