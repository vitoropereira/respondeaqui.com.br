import { useState, FormEvent, ChangeEvent, useContext } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { v4 as uuidv4 } from "uuid";

import { Input } from "./Input";
import {
  AuthUserContext,
  UserProps,
} from "src/context/AuthUserContextProvider";
import { CreateQuestion } from "src/models/questions";
import { FirebaseQuestionRepository } from "src/repositories/firebase/firebase-question";
import { CreateUser } from "src/models/user";
import { FirebaseUserRepository } from "src/repositories/firebase/firebase-user";
import { useRouter } from "next/router";
import Image from "next/image";

interface QuestionProps {
  idQuestion: string;
  content: string;
  authorId: string;
  questionedAt: Date;
}

interface NewCharProps {
  user: UserProps;
  show: boolean;
  setShow: (show: boolean) => void;
}

export function NewChat({ user, show, setShow }: NewCharProps) {
  const [question, setQuestion] = useState<QuestionProps>();
  const [newQuestion, setNewQuestion] = useState("");
  const [listQuestion, setListQuestion] = useState();

  const { currentUser } = useContext(AuthUserContext);
  const router = useRouter();
  const firebaseQuestionRepository = new FirebaseQuestionRepository();
  const createQuestion = new CreateQuestion(firebaseQuestionRepository);

  const handleNewQuestionChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    event.target.setCustomValidity("");
    setNewQuestion(event.target.value);
    const findQuestions = await firebaseQuestionRepository.findQuestionByText(
      newQuestion
    );
    console.log("findQuestions");
    console.log(findQuestions);
  };

  const handleCreateNewQuestion = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const newId = uuidv4();

      const firebaseUserRepository = new FirebaseUserRepository();
      const createUser = new CreateUser(firebaseUserRepository);
      const userData = await createUser.getUserByEmail(currentUser.email);

      if (!userData) {
        throw new Error("Usuário não encontrado!");
      }

      const fullQuestion = {
        idQuestion: newId,
        content: newQuestion,
        authorId: userData.userId,
        questionedAt: new Date(),
      };

      setQuestion(fullQuestion);

      const response = createQuestion.createQuestion(fullQuestion);

      setNewQuestion("");
    } catch (error) {
      console.log(error);
      router.push("../login");
    }
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div
      className="w-[35%] max-w-[415px] fixed left-0 top-0 bottom-0 bg-light-background dark:bg-dark-background flex flex-col border-r-[1px] border-r-light-border dark:border-r-dark-border transition-all ease-linear max-md:fixed max-md:w-full max-md:h-full max-md:flex-1 max-md:z-10 z-10   "
      style={{ left: show ? 0 : -420 }}
    >
      <div className="flex bg-brand-500 items-center pt-[60px] pr-[15px] pb-[15px] pl-[15px]">
        <div
          onClick={handleClose}
          className="w-10 h-10 flex justify-center items-center cursor-pointer"
        >
          <ArrowBackIcon style={{ color: "#FFF" }} />
        </div>
        <h2 className="text-lg h-10 leading-10 flex-1 font-bold text-white ml-5">
          Nova Pergunta
        </h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        <Input
          placeholderText="Tire suas duvidas!"
          onChange={handleNewQuestionChange}
          value={newQuestion}
          icon={false}
        />
        <div className="px-4 py-1 max-[994px]:w-screen">
          <div className="h-10 rounded-[10px] flex items-center px-1 py-0">
            <button
              type="submit"
              className="py-1 px-2 w-full 
                        bg-dark-background dark:bg-light-chatBackground 
                        hover:bg-dark-backgroundHover dark:hover:bg-light-backgroundHover 
                        text-dark-text dark:text-light-text  
                        transition ease-in duration-200 text-center text-base font-semibold shadow-md 
                        focus:outline-none 
                        rounded-lg "
              onClick={handleCreateNewQuestion}
            >
              Enviar Pergunta
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {listQuestion &&
          listQuestion.map((item, key) => (
            <div
              className="flex items-center p-4 cursor-pointer hover:bg-light-backgroundHover dark:hover:bg-dark-backgroundHover"
              key={key}
            >
              <Image
                width={50}
                height={50}
                className="rounded-full mr-4"
                alt="Imagem do usuário."
                src={item.avatar}
              />
              <div className="text-base text-light-text dark:text-dark-text">
                {item.name}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
