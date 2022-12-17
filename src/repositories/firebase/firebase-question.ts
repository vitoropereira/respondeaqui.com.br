import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import "firebase/compat/auth";
import { db } from "../../service/fireBase";
import { QuestionRepository } from "../question-repository";

interface QuestionProps {
  idQuestion: string;
  content: string;
  authorId: string;
  questionedAt: Date;
}

export class FirebaseQuestionRepository implements QuestionRepository {
  async createQuestion(questionData: QuestionProps) {
    try {
      const docRef = await addDoc(collection(db, "questions"), questionData);

      console.log("Document written with ID: ", docRef.id);
      console.log(docRef);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async findQuestionByText(text: string) {
    try {
      const questions = [];

      const q = query(
        collection(db, "questions"),
        where("content", "==", `%${text}`)
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log("---- doc.data() ----- ");
          console.log(doc.data());
          questions.push(doc.data().name);
        });
        console.log("Current questions: ", questions.join(", "));
      });
      return questions;
    } catch (e) {
      console.error("Error adding document: ", e);
      return false;
    }
  }
}
