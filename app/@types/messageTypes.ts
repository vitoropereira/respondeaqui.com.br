import { User } from "@prisma/client";

export interface MessageProps {
  id?: string;
  content: string;
  content_type: "text" | "image";
  chat_id: string;
  user_id: string;
  user?: User;
  created_at?: Date;
}
