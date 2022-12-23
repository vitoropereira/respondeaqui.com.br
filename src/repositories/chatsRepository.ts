import { Chat } from "@prisma/client";

interface ChatsProps {
  content: string;
  question_id: string;
  user_id: string;
}

export interface ChatsRepository {
  createChat: ({ content, question_id, user_id }: ChatsProps) => Promise<Chat>;
  getChatsByQuestionsId: (question_id: string) => Promise<Chat[]>;
}
