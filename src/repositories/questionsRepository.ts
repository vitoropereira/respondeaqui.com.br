import { Question } from "@prisma/client";

interface QuestionProps {
  content: string;
  user_id: string;
}

export interface QuestionsRepository {
  createQuestion: (questionData: QuestionProps) => Promise<Question>;
  findQuestionByText: (text: string) => Promise<boolean>;
  findQuestionByUserId: (user_id: string) => Promise<Question[]>;
  findAllQuestion: () => Promise<Question[]>;
}
