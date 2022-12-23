import prisma from "src/service/prisma";
import { QuestionsRepository } from "../questionsRepository";

interface QuestionProps {
  content: string;
  user_id: string;
}

export class PrismaQuestionRepository implements QuestionsRepository {
  async createQuestion({ content, user_id }: QuestionProps) {
    const response = await prisma.question.create({
      data: { content, user_id },
      include: {
        user: true,
      },
    });

    return response;
  }

  async findQuestionByText(text: string) {
    return false;
  }

  async findQuestionByUserId(user_id: string) {
    const questions = await prisma.question.findMany({
      where: {
        user_id,
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
