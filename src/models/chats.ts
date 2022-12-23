import { PrismaChatRepository } from "src/repositories/prisma/prismaChatsRepository";

interface ChatsProps {
  content: string;
  question_id: string;
  user_id: string;
}

export class Chats {
  constructor(private prismaChatRepository: PrismaChatRepository) {}
  async createChats(ChatsData: ChatsProps) {
    const { content, user_id, question_id } = ChatsData;
    try {
      const saveChats = await this.prismaChatRepository.createChat({
        content,
        user_id,
        question_id,
      });
      return saveChats;
    } catch (e) {
      console.error("Error createChats: ", e);
      return false;
    }
  }

  async getChatsByQuestionsId(question_id: string) {
    try {
      const getChats = await this.prismaChatRepository.getChatsByQuestionsId(
        question_id
      );
      return getChats;
    } catch (e) {
      console.error("Error createChats: ", e);
      return false;
    }
  }
}
