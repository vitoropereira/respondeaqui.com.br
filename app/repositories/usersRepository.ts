import { User } from '@prisma/client'
import { SafeUser } from '../@types/userTypes'

export interface CreateUserProps {
  image: string
  email: string
  name: string
}

export interface UsersRepository {
  createUser: ({
    image,
    email,
    name,
  }: CreateUserProps) => Promise<User | undefined>
  findUserByEmail: (email: string) => Promise<User | undefined>
  findUserByUserId: (userId: string) => Promise<User | undefined>
  updateUserData: (
    userId: string,
    userData: SafeUser,
  ) => Promise<User | undefined>
  updateUserDataTutorial: (
    userId: string,
    tutorialSteps: number,
  ) => Promise<User | undefined>
}
