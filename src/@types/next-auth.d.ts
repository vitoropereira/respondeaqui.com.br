import { User } from '@prisma/client'

import NextAuth from 'next-auth'

export type SafeUser = Omit<
  User,
  'createdAt' | 'updatedAt' | 'emailVerified'
> & {
  tutorial_steps?: number
  createdAt: string
  updatedAt: string
  emailVerified: string | null
}

declare module 'next-auth' {
  export interface User {
    id: string
    name: string
    email: string
    tutorial_steps?: number
    image?: string
  }

  export interface Session {
    user: {
      id: string
      name: string
      email: string
      tutorial_steps?: number
      image?: string
    }
  }
}
