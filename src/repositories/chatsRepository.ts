import { Chat } from "@prisma/client";

interface ChatsProps {
  content: string;
  questionId: string;
  user_id: string;
}

export interface ChatsRepository {
  createChat: ({ content, questionId, user_id }: ChatsProps) => Promise<Chat>;
  getChatsByQuestionsId: (questionId: string) => Promise<Chat[]>;
}
