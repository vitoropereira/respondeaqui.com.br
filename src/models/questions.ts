import { PrismaQuestionRepository } from "src/repositories/prisma/prismaQuestionsRepository";

interface QuestionProps {
  content: string;
  user_id: string;
}

export class Question {
  constructor(private prismaQuestionRepository: PrismaQuestionRepository) {}
  async createQuestion(questionData: QuestionProps) {
    const { content, user_id } = questionData;
    try {
      const saveQuestion = await this.prismaQuestionRepository.createQuestion({
        content,
        user_id,
      });
      return saveQuestion;
    } catch (e) {
      console.error("Error createQuestion: ", e);
      return false;
    }
  }

  async filterQuestionsByText(text: string) {
    const questions = this.prismaQuestionRepository.findQuestionByText(text);
  }

  async getQuestionsByuser_id(user_id: string) {
    try {
      const userQuestions =
        await this.prismaQuestionRepository.findQuestionByUserId(user_id);
      return userQuestions;
    } catch (e) {
      console.error("Error getQUestions: ", e);
      return false;
    }
  }

  async getAllQuestions() {
    try {
      const questions = await this.prismaQuestionRepository.findAllQuestion();
      return questions;
    } catch (e) {
      console.error("Error getQUestions: ", e);
      return false;
    }
  }
}
