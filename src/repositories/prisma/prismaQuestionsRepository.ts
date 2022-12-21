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
      include: {
        user: true,
      },
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
        chat: {
          orderBy: {
            created_at: "desc",
          },
        },
      },
    });

    return questions;
  }

  async findAllQuestion() {
    const questions = await prisma.question.findMany({
      include: {
        user: true,
        chat: {
          orderBy: {
            created_at: "desc",
          },
        },
      },
    });

    return questions;
  }
}
