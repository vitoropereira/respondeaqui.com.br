interface UserProps {
  userId: string;
  name: string;
  avatar: string;
  email: string;
}

export interface UserRepository {
  addUser: (user: UserProps) => Promise<void>;
  findUserByEmail: (email: string) => Promise<UserProps | undefined>;
}
