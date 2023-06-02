import { User } from "@prisma/client";
import { UpdateUserProps, UserProps } from "app/@types/userTypes";
import prisma from "src/service/prisma";
import { UsersRepository } from "../usersRepository";

export class PrismaUsersRepository implements UsersRepository {
  async createUser({ avatar_url, email, username }: UserProps) {
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

  async findUserByUserId(userId: string) {
    const existUser = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (existUser) {
      return existUser;
    }

    return undefined;
  }

  async updateUserDataTutorial(userId: string, userData: UpdateUserProps) {
    const { tutorial_steps } = userData;

    const user = await this.findUserByUserId(userId);

    const tutorialStepsLevel = user.tutorial_steps + tutorial_steps;

    const userUpdated = await prisma.user.update({
      data: {
        tutorial_steps: tutorialStepsLevel,
      },
      where: {
        id: userId,
      },
    });

    if (userUpdated) {
      return userUpdated;
    }
  }
}
