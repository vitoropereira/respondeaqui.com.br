import { User } from "@prisma/client";

interface UserProps {
  username: string;
  email: string;
  avatar_url: string;
  signInMethod: string[];
  features: string[];
}

export interface UsersRepository {
  createUser: ({
    avatar_url,
    email,
    username,
    signInMethod,
    features,
  }: UserProps) => Promise<User>;
  findUserByEmail: (email: string) => Promise<User | undefined>;
  updateUserData: (user: User, userData: UserProps) => Promise<User>;
}
