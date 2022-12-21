import { Chat } from "@prisma/client";

interface ChatsProps {
  content: string;
  questionId: string;
  userId: string;
}

export interface ChatsRepository {
  createChat: ({ content, questionId, userId }: ChatsProps) => Promise<Chat>;
  getChatsByQuestionsId: (questionId: string) => Promise<Chat[]>;
}
