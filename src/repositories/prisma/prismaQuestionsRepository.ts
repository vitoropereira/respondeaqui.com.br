import { prisma } from "src/service/prisma";
import { QuestionsRepository } from "../questionsRepository";

interface QuestionProps {
  content: string;
  userId: string;
}

export class PrismaQuestionRepository implements QuestionsRepository {
  async createQuestion({ content, userId }: QuestionProps) {
    const response = await prisma.question.create({
      data: { content, userId },
    });

    return response;
  }

  async findQuestionByText(text: string) {
    return false;
  }

  async findQuestionByUserId(userId: string) {
    const questions = await prisma.question.findMany({
      where: {
        userId,
      },
      include: {
        user: true,
      },
    });

    return questions;
  }

  async findAllQuestion() {
    const questions = await prisma.question.findMany({
      orderBy: {
        updated_at: "desc",
      },
      include: {
        user: true,
      },
    });

    return questions;
  }
}
