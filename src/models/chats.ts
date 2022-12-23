import { PrismaChatRepository } from "src/repositories/prisma/prismaChatsRepository";

interface ChatsProps {
  content: string;
  questionId: string;
  user_id: string;
}

export class Chats {
  constructor(private prismaChatRepository: PrismaChatRepository) {}
  async createChats(ChatsData: ChatsProps) {
    const { content, user_id, questionId } = ChatsData;
    try {
      const saveChats = await this.prismaChatRepository.createChat({
        content,
        user_id,
        questionId,
      });
      return saveChats;
    } catch (e) {
      console.error("Error createChats: ", e);
      return false;
    }
  }

  async getChatsByQuestionsId(questionId: string) {
    try {
      const getChats = await this.prismaChatRepository.getChatsByQuestionsId(
        questionId
      );
      return getChats;
    } catch (e) {
      console.error("Error createChats: ", e);
      return false;
    }
  }
}
