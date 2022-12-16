import { UserRepository } from "../repositories/user-repository";

interface UserProps {
  name: string;
  avatar: string;
  email: string;
}

export class CreateUser {
  constructor(private userRepository: UserRepository) {}
  async createUser(userData: UserProps) {
    let user;
    try {
      const emailExist = await this.validateUniqueEmail(userData.email);
      if (!userData.avatar) {
        const userAvatarUrl = await this.createAvatar(userData.name);
        userData.avatar = userAvatarUrl;
      }

      if (!emailExist) {
        await this.userRepository.addUser(userData);
      }
    } catch (e) {
      console.error("Error createUser: ", e);
      return false;
    }
  }

  async validateUniqueEmail(email: string) {
    try {
      const existEmail = await this.userRepository.findUSerByEmail(email);
      if (existEmail) {
        return true;
      }
      return false;
    } catch (e) {
      console.error("Error validateUniqueEmail: ", e);
      return false;
    }
  }

  async createAvatar(name: string) {
    const splittedName = name.split(" ");
    let urlAvatar;
    if (splittedName.length > 1) {
      urlAvatar = `https://ui-avatars.com/api/?name=${
        splittedName[0] + splittedName[1]
      }`;
    } else {
      urlAvatar = `https://ui-avatars.com/api/?name=${splittedName[0]}`;
    }
    return urlAvatar;
  }

  // async hashPassword(unhashedPassword: string) {
  //   return await hash(unhashedPassword, 10);
  // }
}
