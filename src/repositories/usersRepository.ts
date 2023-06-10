import { User } from "@prisma/client";
import { UpdateUserProps, UserProps } from "src/@types/userTypes";

export interface UsersRepository {
  createUser: ({ avatar_url, email, username }: UserProps) => Promise<User>;
  findUserByEmail: (email: string) => Promise<User | undefined>;
  findUserByUserId: (userId: string) => Promise<User | undefined>;
  updateUserDataTutorial: (
    userId: string,
    userData: UpdateUserProps
  ) => Promise<User>;
}
