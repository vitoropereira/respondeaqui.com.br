import { User } from 'next-auth'

export type SafeUser = Omit<
  User,
  'createdAt' | 'updatedAt' | 'emailVerified' | 'favorite'
> & {
  tutorial_steps?: number
  createdAt: string
  updatedAt: string
  emailVerified: string | null
}
