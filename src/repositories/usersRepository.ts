import { User } from "@prisma/client";

interface UserProps {
  username: string;
  email: string;
  avatarURL: string;
  signInMethod: string[];
  features: string[];
}

export interface UsersRepository {
  createUser: ({
    avatarURL,
    email,
    username,
    signInMethod,
    features,
  }: UserProps) => Promise<User>;
  findUserByEmail: (email: string) => Promise<User | undefined>;
  updateUserData: (user: User, userData: UserProps) => Promise<User>;
}
