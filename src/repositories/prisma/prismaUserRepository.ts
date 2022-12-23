import { User } from "@prisma/client";
import prisma from "src/service/prisma";
import { combineArrays } from "src/utils/generalFunctions";
import { UsersRepository } from "../usersRepository";

interface UserProps {
  username: string;
  email: string;
  avatar_url: string;
  signInMethod: string[];
  features: string[];
}

export class PrismaUsersRepository implements UsersRepository {
  async createUser({
    avatar_url,
    email,
    username,
    signInMethod,
    features,
  }: UserProps) {
    const user = await prisma.user.create({
      data: {
        email,
        username,
        signInMethod,
        avatar_url,
        features,
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

    const newFeatures = combineArrays(features, user.features) as string[];

    const userUpdated = prisma.user.update({
      data: {
        username,
        email,
        avatar_url,
        features: newFeatures,
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
