interface UserProps {
  name: string;
  avatar: string;
  email: string;
}

export interface UserRepository {
  addUser: (user: UserProps) => Promise<void>;
  findUSerByEmail: (email: string) => Promise<boolean>;
}
