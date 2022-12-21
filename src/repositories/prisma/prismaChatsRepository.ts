import { prisma } from "src/service/prisma";
import { ChatsRepository } from "../chatsRepository";

interface ChatsProps {
  content: string;
  questionId: string;
  userId: string;
}

export class PrismaChatRepository implements ChatsRepository {
  async createChat({ content, questionId, userId }: ChatsProps) {
    const response = await prisma.chat.create({
      data: { content, questionId, userId },
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
