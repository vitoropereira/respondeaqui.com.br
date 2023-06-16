import { PrismaUsersRepository } from '@/src/repositories/prisma/prismaUserRepository'
import { NextResponse } from 'next/server'

interface IParams {
  userId: string
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const { userId } = params

  const body = await request.json()
  const { tutorialSteps } = body

  const prismaUsersRepository = new PrismaUsersRepository()

  const updateUserTutorial = await prismaUsersRepository.updateUserDataTutorial(
    userId,
    tutorialSteps,
  )

  return NextResponse.json(updateUserTutorial, { status: 201 })
}
