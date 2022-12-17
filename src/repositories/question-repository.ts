interface QuestionProps {
  idQuestion: string;
  content: string;
  authorId: string;
  questionedAt: Date;
}

export interface QuestionRepository {
  createQuestion: (questionData: QuestionProps) => Promise<void>;
  findQuestionByText: (text: string) => Promise<false | QuestionProps[]>;
}
