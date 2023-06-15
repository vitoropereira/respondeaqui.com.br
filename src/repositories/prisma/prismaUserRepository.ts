import { User } from '@prisma/client'
import { UpdateUserProps, UserProps } from 'src/@types/userTypes'
import prisma from 'src/service/prisma'
import { UsersRepository } from '../usersRepository'
import { SafeUser } from '@/src/@types/next-auth'

export class PrismaUsersRepository implements UsersRepository {
  async createUser({ image, email, name }: SafeUser) {
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

  async updateUserDataTutorial(userId: string, userData: SafeUser) {
    const { tutorial_steps } = userData

    const user = await this.findUserByUserId(userId)

    if (!user) {
      return undefined
    }

    const tutorialStepsLevel = user.tutorial_steps + tutorial_steps

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
