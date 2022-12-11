export interface UserProps {
  id: string;
  name: string;
  avatar: string;
}

export interface UserRepository {
  addUser: (User: UserProps) => Promise<void>;
}
