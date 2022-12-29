export interface UserProps {
  id: string;
  username: string;
  email: string;
  signInMethod: string[];
  avatar_url: string;
  created_at: Date;
  updated_at: Date;
}
