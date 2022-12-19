import { User } from "@prisma/client";
import { NextApiRequest } from "next";
import { UsersRepository } from "src/repositories/usersRepository";
import { combineArrays } from "src/utils/generalFunctions";

interface UserCreateData {
  username: string;
  email: string;
  avatarURL: string;
  signInMethod: string[];
  features: string[];
}

export class UserModel {
  constructor(private usersRepository: UsersRepository) {}
  async create(request: UserCreateData) {
    const userData = await this.validateUniqueEmail(request.email);

    if (userData) {
      const userUpdated = await this.updateUserData(userData, request);
      return userUpdated;
    }

    const { avatarURL, email, signInMethod, username, features } = request;

    const newUserFeatures = [
      "read:user",
      "read:content",
      "update:content",
      "create:content",
    ];

    const newFeatures = combineArrays(features, newUserFeatures) as string[];

    const user = await this.usersRepository.createUser({
      avatarURL,
      email,
      signInMethod,
      username,
      features: newFeatures,
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

  async updateUserData(user: User, request: UserCreateData) {
    const updatedUser = await this.usersRepository.updateUserData(
      user,
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
