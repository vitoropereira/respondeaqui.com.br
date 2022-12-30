import { User } from "@prisma/client";
import prisma from "src/service/prisma";
import { uniqueElements } from "src/utils/generalFunctions";
import { UsersRepository } from "../usersRepository";

interface UserProps {
  username: string;
  email: string;
  avatar_url: string;
  signInMethod: string[];
  features: string[];
}

export class PrismaUsersRepository implements UsersRepository {
  async createUser({ avatar_url, email, username, features }: UserProps) {
    const user = await prisma.user.create({
      data: {
        email,
        username,
        avatar_url,
      },
    });

    return user;
  }

  async findUserByEmail(email: string) {
    const existUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (existUser) {
      return existUser;
    }

    return undefined;
  }

  async updateUserData(user: User, userData: UserProps) {
    const { email, username, avatar_url, features } = userData;

    const userUpdated = prisma.user.update({
      data: {
        username,
        email,
        avatar_url,
      },
      where: {
        id: user.id,
      },
    });

    if (userUpdated) {
      return userUpdated;
    }
  }
}
