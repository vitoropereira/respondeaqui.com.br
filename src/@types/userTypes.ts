export interface UserProps {
  id?: string
  username: string
  email: string
  image?: string
  tutorial_steps?: number
  created_at?: Date
  updated_at?: Date
}

export interface UpdateUserProps {
  username?: string
  email?: string
  avatar_url?: string
  tutorial_steps?: number
}
