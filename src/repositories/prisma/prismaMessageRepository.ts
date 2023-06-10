import prisma from "src/service/prisma";
import { MessagesRepository } from "../messagesRepository";

interface messagesProps {
  content: string;
  chat_id: string;
  user_id: string;
  content_type: "text" | "image";
}

export class PrismaMessageRepository implements MessagesRepository {
  async createMessage({
    content,
    chat_id,
    user_id,
    content_type,
  }: messagesProps) {
    const response = await prisma.message.create({
      data: { content, chat_id, user_id, content_type },
      include: {
        user: true,
        chat: true,
      },
    });

    return response;
  }

  async getMessagesByChatId(chat_id: string) {
    const response = await prisma.message.findMany({
      where: {
        chat_id,
      },
      orderBy: {
        created_at: "asc",
      },
      include: {
        user: true,
        chat: true,
      },
    });

    return response;
  }
}
