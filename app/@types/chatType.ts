import { MessageProps } from "./messageTypes";
import { UserProps } from "./userTypes";

export interface ChatProps {
  id: string;
  content: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  user: UserProps;
  message: MessageProps[];
}
