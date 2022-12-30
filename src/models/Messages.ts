import { PrismaMessageRepository } from "src/repositories/prisma/prismaMessageRepository";

interface MessagesProps {
  content: string;
  chat_id: string;
  user_id: string;
  content_type: "text" | "image";
}

export class Messages {
  constructor(private prismaMessageRepository: PrismaMessageRepository) {}
  async createMessages(messagesData: MessagesProps) {
    const { content, user_id, chat_id, content_type } = messagesData;
    try {
      const saveMessages = await this.prismaMessageRepository.createMessage({
        content,
        user_id,
        chat_id,
        content_type,
      });
      return saveMessages;
    } catch (e) {
      console.error("Error createMessages: ", e);
      return false;
    }
  }

  async getMessagesByChatId(chat_id: string) {
    try {
      const getMessages =
        await this.prismaMessageRepository.getMessagesByChatId(chat_id);
      return getMessages;
    } catch (e) {
      console.error("Error createMessages: ", e);
      return false;
    }
  }
}
