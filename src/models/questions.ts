import { PrismaQuestionRepository } from "src/repositories/prisma/prismaQuestionsRepository";

interface QuestionProps {
  content: string;
  userId: string;
}

export class Question {
  constructor(private prismaQuestionRepository: PrismaQuestionRepository) {}
  async createQuestion(questionData: QuestionProps) {
    const { content, userId } = questionData;
    try {
      const saveQuestion = await this.prismaQuestionRepository.createQuestion({
        content,
        userId,
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

  async getQuestionsByUserId(userId: string) {
    try {
      const userQuestions =
        await this.prismaQuestionRepository.findQuestionByUserId(userId);
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
