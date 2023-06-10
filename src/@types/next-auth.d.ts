import { User } from '@prisma/client'

export type SafeUser = Omit<
  User,
  'createdAt' | 'updatedAt' | 'emailVerified'
> & {
  tutorial_steps?: number
  createdAt: string
  updatedAt: string
  emailVerified: string | null
}
