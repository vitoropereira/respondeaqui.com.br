import { Message } from "@prisma/client";

interface MessagesProps {
  content: string;
  chat_id: string;
  user_id: string;
  content_type: "text" | "image";
}

export interface MessagesRepository {
  createMessage: ({
    content,
    chat_id,
    user_id,
    content_type,
  }: MessagesProps) => Promise<Message>;
  getMessagesByChatId: (chat_id: string) => Promise<Message[]>;
}
