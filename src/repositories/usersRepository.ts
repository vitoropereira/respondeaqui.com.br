import { User } from '@prisma/client'
import { SafeUser } from '../@types/next-auth'

export interface UsersRepository {
  createUser: ({ image, email, name }: SafeUser) => Promise<User>
  findUserByEmail: (email: string) => Promise<User | undefined>
  findUserByUserId: (userId: string) => Promise<User | undefined>
  updateUserDataTutorial: (
    userId: string,
    userData: SafeUser,
  ) => Promise<User | undefined>
}
