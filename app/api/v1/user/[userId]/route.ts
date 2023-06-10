import { PrismaUsersRepository } from '@/app/repositories/prisma/prismaUserRepository'
import { NextResponse } from 'next/server'

interface IParams {
  userId?: string
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const { userId } = params
  console.log('userId')
  console.log(userId)

  const body = await request.json()
  const { tutorialSteps } = body
  console.log('tutorialSteps')
  console.log(tutorialSteps)
  const prismaUsersRepository = new PrismaUsersRepository()

  const updateUserTutorial = await prismaUsersRepository.updateUserDataTutorial(
    String(userId),
    tutorialSteps,
  )

  return NextResponse.json(updateUserTutorial)
}
