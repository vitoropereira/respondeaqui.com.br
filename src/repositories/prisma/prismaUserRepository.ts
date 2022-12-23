import { User } from "@prisma/client";
import prisma from "src/service/prisma";
import { combineArrays } from "src/utils/generalFunctions";
import { UsersRepository } from "../usersRepository";

interface UserProps {
  username: string;
  email: string;
  avatarURL: string;
  signInMethod: string[];
  features: string[];
}

export class PrismaUsersRepository implements UsersRepository {
  async createUser({
    avatarURL,
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
        avatarURL,
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
    const { email, username, avatarURL, features } = userData;

    const newFeatures = combineArrays(features, user.features) as string[];

    const userUpdated = prisma.user.update({
      data: {
        username,
        email,
        avatarURL,
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
