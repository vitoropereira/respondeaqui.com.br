import { prisma } from "src/service/prisma";
import { ChatsRepository } from "../chatsRepository";

interface ChatsProps {
  content: string;
  questionId: string;
  user_id: string;
}

export class PrismaChatRepository implements ChatsRepository {
  async createChat({ content, questionId, user_id }: ChatsProps) {
    const response = await prisma.chat.create({
      data: { content, questionId, user_id },
      include: {
        user: true,
        question: true,
      },
    });

    return response;
  }

  async getChatsByQuestionsId(questionId: string) {
    const response = await prisma.chat.findMany({
      where: {
        questionId,
      },
      orderBy: {
        created_at: "asc",
      },
      include: {
        user: true,
        question: true,
      },
    });

    return response;
  }
}
