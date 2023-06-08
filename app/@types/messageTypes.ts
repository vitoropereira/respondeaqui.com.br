import { UserProps } from './userTypes'

export interface MessageProps {
  id?: string
  content: string
  content_type: 'text' | 'image'
  chat_id: string
  user_id: string
  user?: UserProps
  created_at?: Date
}
