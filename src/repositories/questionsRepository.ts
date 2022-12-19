import { Question } from "@prisma/client";

interface QuestionProps {
  content: string;
  userId: string;
}

export interface QuestionsRepository {
  createQuestion: (questionData: QuestionProps) => Promise<Question>;
  findQuestionByText: (text: string) => Promise<boolean>;
  findQuestionByUserId: (userId: string) => Promise<Question[]>;
  findAllQuestion: () => Promise<Question[]>;
}
