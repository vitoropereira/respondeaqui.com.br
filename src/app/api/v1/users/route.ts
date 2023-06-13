import { PrismaUsersRepository } from '@/src/repositories/prisma/prismaUserRepository'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()

  const prismaUsersRepository = new PrismaUsersRepository()

  const newUser = await prismaUsersRepository.createUser(body)

  const data = {
    ...newUser,
    createdAt: newUser.created_at.toISOString(),
    updatedAt: newUser.updated_at.toISOString(),
    emailVerified: newUser.emailVerified?.toISOString() || null,
  }

  return NextResponse.json(data)
}
