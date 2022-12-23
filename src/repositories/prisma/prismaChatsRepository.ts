import prisma from "src/service/prisma";
import { ChatsRepository } from "../chatsRepository";

interface ChatsProps {
  content: string;
  question_id: string;
  user_id: string;
}

export class PrismaChatRepository implements ChatsRepository {
  async createChat({ content, question_id, user_id }: ChatsProps) {
    const response = await prisma.chat.create({
      data: { content, question_id, user_id },
      include: {
        user: true,
        question: true,
      },
    });

    return response;
  }

  async getChatsByQuestionsId(question_id: string) {
    const response = await prisma.chat.findMany({
      where: {
        question_id,
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
