import { User } from "@prisma/client";
import { NextApiRequest } from "next";
import { UserProps } from "src/@types/userTypes";
import { UsersRepository } from "src/repositories/usersRepository";
import { combineArrays } from "src/utils/generalFunctions";

export class UserModel {
  constructor(private usersRepository: UsersRepository) {}
  async create(request: UserProps) {
    const userData = await this.validateUniqueEmail(request.email);
    if (userData) {
      const userUpdated = await this.updateUserData(userData.id, request);
      return userUpdated;
    }

    const { avatar_url, email, username, tutorial_steps } = request;

    const user = await this.usersRepository.createUser({
      avatar_url,
      email,
      username,
    });

    return user;
  }

  async validateUniqueEmail(email: string) {
    const existUserWithEmail = await this.usersRepository.findUserByEmail(
      email
    );
    if (existUserWithEmail) {
      return existUserWithEmail;
    }

    return undefined;
  }

  async updateUserData(userId: string, request: UserProps) {
    const updatedUser = await this.usersRepository.updateUserDataTutorial(
      userId,
      request
    );

    return updatedUser;
  }

  async getUserData(request: NextApiRequest) {
    const userRequest = request.body as User;

    const existUserWithEmail = await this.usersRepository.findUserByEmail(
      userRequest.email
    );

    if (existUserWithEmail) {
      return existUserWithEmail;
    }

    return undefined;
  }
}
