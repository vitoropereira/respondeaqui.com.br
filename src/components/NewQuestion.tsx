import { useState, useEffect, FormEvent, ChangeEvent, useContext } from "react";
import Image from "next/image";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import {
  AuthUserContext,
  UserProps,
} from "src/context/AuthUserContextProvider";

import { Input } from "./Input";
import { Loading } from "./Loading";

interface QuestionProps {
  content: string;
  userId: string;
}

interface NewQuestionProps {
  user: UserProps;
  show: boolean;
  setShow: (show: boolean) => void;
}

export interface QuestionLists {
  id: string;
  content: string;
  userId: string;
  created_at: string;
  updated_at: string;
  user: User;
}

export interface User {
  id: string;
  username: string;
  email: string;
  signInMethod: string[];
  features: string[];
  avatarURL: string;
  created_at: string;
  updated_at: string;
}

export function NewQuestion({ user, show, setShow }: NewQuestionProps) {
  const [question, setQuestion] = useState<QuestionProps>();
  const [newQuestion, setNewQuestion] = useState("");
  const [listQuestion, setListQuestion] = useState<QuestionLists[]>();
  const [globalErrorMessage, setGlobalErrorMessage] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [errorObject, setErrorObject] = useState(undefined);

  const { currentUser } = useContext(AuthUserContext);

  const handleNewQuestionChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    event.target.setCustomValidity("");
    setNewQuestion(event.target.value);
  };

  const handleCreateNewQuestion = async (event: FormEvent) => {
    setIsLoading(true);
    event.preventDefault();

    try {
      const fullQuestion = {
        content: newQuestion,
        userId: currentUser.id,
        features: currentUser.features,
      };

      const response = await fetch(`/api/v1/questions`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fullQuestion),
      });

      setGlobalErrorMessage(undefined);

      const responseBody = await response.json();

      if (response.status === 201) {
        setNewQuestion("");
        setIsLoading(false);
        //TODO: atualizar a lista de questões que o usuário possui.
        return;
      }

      if (response.status === 400) {
        setErrorObject(responseBody);
        setIsLoading(false);
        return;
      }

      if (response.status >= 401) {
        setGlobalErrorMessage(`${responseBody.message} ${responseBody.action}`);
        setIsLoading(false);
        return;
      }
    } catch (error) {
      console.log("error");
      console.log(error);
      setGlobalErrorMessage(
        "Não foi possível se conectar ao Responde Aqui. Por favor, verifique sua conexão."
      );
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setShow(false);
  };

  async function getAllQuestionByUser(userId: string) {
    try {
      const response = await fetch(`/api/v1/questions/${userId}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      setGlobalErrorMessage(undefined);

      const responseBody = await response.json();

      if (response.status === 200) {
        setIsLoading(false);
        setListQuestion(responseBody);
        return;
      }

      if (response.status === 400) {
        setErrorObject(responseBody);
        setIsLoading(false);
        return;
      }

      if (response.status >= 401) {
        setGlobalErrorMessage(`${responseBody.message} ${responseBody.action}`);
        setIsLoading(false);
        return;
      }
    } catch (error) {
      console.log("error");
      console.log(error);
      setGlobalErrorMessage(
        "Não foi possível se conectar ao Responde Aqui. Por favor, verifique sua conexão."
      );
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getAllQuestionByUser(currentUser.id);
  }, [currentUser.id]);

  return (
    <div
      className="w-[35%] max-w-[415px] fixed left-0 top-0 bottom-0 bg-light-background dark:bg-dark-background flex flex-col border-r-[1px] border-r-light-border dark:border-r-dark-border transition-all ease-linear max-md:fixed max-md:w-full max-md:h-full max-md:flex-1 max-md:z-10 z-10   "
      style={{ left: show ? 0 : -420 }}
    >
      <div className="flex bg-brand-500 items-center pt-[10px] pr-[15px] pb-[15px] pl-[15px]">
        <div
          onClick={handleClose}
          className="w-10 h-10 flex justify-center items-center cursor-pointer"
        >
          <ArrowBackIcon style={{ color: "#FFF" }} />
        </div>
        <h2 className="text-lg h-10 leading-10 flex-1 font-bold text-white ml-5">
          Suas Perguntas
        </h2>
      </div>
      <div className="flex-1 overflow-y-auto  max-h-40">
        <p className="px-4 py-2 pl-6 mt-1 text-base font-bold dark:text-dark-text text-light-text max-[994px]:w-screen">
          Enviar Nova Pergunta
        </p>
        <Input
          placeholderText="Crie uma nova pergunta!"
          onChange={handleNewQuestionChange}
          value={newQuestion}
          icon={false}
        />
        <div className="px-4 py-1 max-[994px]:w-screen">
          <div className="h-10 rounded-[10px] flex items-center px-1 py-0">
            <button
              type="submit"
              className="py-1 px-2 w-full 
                        bg-brand-500 dark:bg-light-chatBackground 
                        hover:bg-dark-backgroundHover dark:hover:bg-light-backgroundHover 
                        text-dark-text dark:text-light-text  
                        transition ease-in duration-200 text-center text-base font-semibold shadow-md 
                        focus:outline-none 
                        rounded-lg "
              disabled={isLoading}
              onClick={handleCreateNewQuestion}
            >
              {isLoading ? <Loading /> : "Enviar Pergunta"}
            </button>
          </div>

          {errorObject && (
            //TODO ajustar os erros com um componente mais bonito.
            <p className="font-medium text-sm dark:text-white text-black">
              {errorObject.message}
            </p>
          )}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {listQuestion &&
          listQuestion.map((item) => {
            return (
              <div
                className="flex items-center p-4 cursor-pointer hover:bg-light-backgroundHover dark:hover:bg-dark-backgroundHover"
                key={item.id}
              >
                <Image
                  width={50}
                  height={50}
                  className="rounded-full mr-4"
                  alt="Imagem do usuário."
                  src={item.user.avatarURL}
                />
                <div className="text-base text-light-text dark:text-dark-text pl-1 flex flex-col justify-start items-start ">
                  <span>{item.content}</span>
                  <span className="text-xs font-thin ml-1">
                    {item.user.username}
                  </span>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}