import { SafeUser } from '@/app/@types/userTypes'
import { CreateUserProps, UsersRepository } from '../usersRepository'
import prisma from '@/app/service/prisma'

export class PrismaUsersRepository implements UsersRepository {
  async createUser({ image, email, name }: CreateUserProps) {
    const user = await prisma.user.create({
      data: {
        email,
        name,
        image,
      },
    })

    return user
  }

  async findUserByEmail(email: string) {
    const existUser = await prisma.user.findFirst({
      where: {
        email,
      },
    })

    if (existUser) {
      return existUser
    }

    return undefined
  }

  async findUserByUserId(userId: string) {
    const existUser = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    })

    if (existUser) {
      return existUser
    }

    return undefined
  }

  async updateUserData(userId: string, userData: SafeUser) {
    const user = await this.findUserByUserId(userId)

    if (!user) {
      return undefined
    }

    const userUpdated = await prisma.user.update({
      data: userData,
      where: {
        id: userId,
      },
    })

    if (userUpdated) {
      return userUpdated
    }
  }

  async updateUserDataTutorial(userId: string, tutorialSteps: number) {
    const user = await this.findUserByUserId(userId)

    if (!user) {
      return undefined
    }

    const tutorialStepsLevel = user.tutorial_steps + tutorialSteps

    const userUpdated = await prisma.user.update({
      data: {
        tutorial_steps: tutorialStepsLevel,
      },
      where: {
        id: userId,
      },
    })

    if (userUpdated) {
      return userUpdated
    }
  }
}
