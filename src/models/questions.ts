import { FirebaseQuestionRepository } from "src/repositories/firebase/firebase-question";
import { FirebaseUserRepository } from "src/repositories/firebase/firebase-user";
import { CreateUser } from "./user";

interface QuestionProps {
  idQuestion: string;
  content: string;
  authorId: string;
  questionedAt: Date;
}

export class CreateQuestion {
  constructor(private firebaseQuestionRepository: FirebaseQuestionRepository) {}
  async createQuestion(questionData: QuestionProps) {
    try {
      const saveQuestion = await this.firebaseQuestionRepository.createQuestion(
        questionData
      );

      console.log("saveQuestion - > CreateQuestion");
      console.log(saveQuestion);
    } catch (e) {
      console.error("Error createQuestion: ", e);
      return false;
    }
  }

  async filterQuestionsByText(text: string) {
    const questions = this.firebaseQuestionRepository.findQuestionByText(text);
    console.log("questions ---->>");
    console.log(questions);
  }
}
