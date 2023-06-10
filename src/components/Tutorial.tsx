import { useSession } from "next-auth/react";
import { ArrowBendLeftUp, ArrowBendRightUp } from "phosphor-react";
import { useState, useEffect } from "react";
import { UpdateUserProps } from "src/@types/userTypes";
import ChatIcon from "@mui/icons-material/Chat";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { Loading } from "./Loading";
import { ShowErrors } from "./ShowErrors";

type Props = {
  tutorialSteps: number;
  handleMakeTutorial: (tutorialSteps: number) => void;
};

export function Tutorial({ tutorialSteps, handleMakeTutorial }: Props) {
  const [globalErrorMessage, setGlobalErrorMessage] =
    useState<string>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [makingTutorial, setMakingTutorial] = useState(tutorialSteps);

  const [width, setWidth] = useState(null);

  const session = useSession();

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    if (typeof window !== "undefined") {
      setWidth(window.innerWidth);

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  async function handleTutorial() {
    setIsLoading(true);

    try {
      const userData: UpdateUserProps = {
        tutorial_steps: 1,
      };

      const response = await fetch(`/api/v1/user/${session.data.user.id}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      setGlobalErrorMessage(undefined);

      const responseBody = await response.json();

      if (response.status === 200) {
        handleMakeTutorial(responseBody.tutorial_steps);
        setMakingTutorial(responseBody.tutorial_steps);
        setIsLoading(false);
      }

      if (response.status === 400) {
        setGlobalErrorMessage(responseBody);
        setIsLoading(false);
        return;
      }

      if (response.status >= 401) {
        setGlobalErrorMessage(`${responseBody.message} ${responseBody.action}`);
        setIsLoading(false);
        return;
      }
    } catch (error) {
      setGlobalErrorMessage(
        "Não foi possível se conectar ao Responde Aqui. Por favor, verifique sua conexão."
      );
      setIsLoading(false);
    }
  }

  useEffect(() => {
    handleMakeTutorial(session.data.user.tutorial_steps);
  }, [handleMakeTutorial, session.data.user.tutorial_steps]);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-500 opacity-80 flex flex-col items-center justify-center z-30">
      {isLoading && <Loading size={10} />}
      {!isLoading && makingTutorial == 0 && (
        <>
          {width < 993 && (
            <ChatIcon
              className="mt-3 ml-[250px] font-bold"
              style={{ color: "#001", width: 50, height: 50 }}
            />
          )}
          {width > 993 && (
            <ChatIcon
              className="mt-3 ml-[-700px] font-bold"
              style={{ color: "#001", width: 50, height: 50 }}
            />
          )}
          <div
            className="w-full h-full flex items-start justify-start 
                      ml-[650px] mt-[30px]
                      max-[994px]:ml-[280px] max-[994px]:mt-[20px]
                      opacity-100"
          >
            {width > 993 && <ArrowBendLeftUp size={32} color="#1d2daa" />}
            <div className="flex flex-col justify-start items-start">
              <p className="mt-3 text-2xl">Crie seu chat aqui!</p>
              <button
                className="mt-3 ms-3 py-1 px-2  
                bg-brand-500 dark:bg-light-chatBackground 
                hover:bg-brand-400 dark:hover:bg-light-backgroundHover 
                text-dark-text dark:text-light-text  
                transition ease-in duration-200 text-center text-base font-semibold shadow-md 
                focus:outline-none 
                rounded-lg "
                onClick={handleTutorial}
                disabled={isLoading}
              >
                Ok obrigado! 😁👌
              </button>
            </div>
            {width < 993 && <ArrowBendRightUp size={32} color="#1d2daa" />}
          </div>
        </>
      )}
      {!isLoading && makingTutorial == 1 && (
        <>
          {width > 993 && (
            <DarkModeIcon
              className="mt-3 ml-[-750px] font-bold"
              style={{ color: "#001", width: 50, height: 50 }}
            />
          )}
          {width < 993 && (
            <DarkModeIcon
              className="mt-3 ml-[200px] font-bold"
              style={{ color: "#001", width: 50, height: 50 }}
            />
          )}
          <div
            className="w-full h-full flex items-start justify-start 
              ml-[600px] mt-[10px]
              max-[994px]:ml-[80px] max-[994px]:mt-[20px]
              opacity-100"
          >
            {width > 993 && <ArrowBendLeftUp size={32} color="#1d2daa" />}
            <div className="flex flex-col justify-start items-start">
              <p className="mt-3 text-2xl w-[250px]">
                Aqui você consegue ajustar o tema.
                <br /> 🌙 🌞
              </p>
              <button
                className="mt-3 ms-3 py-1 px-2  
                bg-brand-500 dark:bg-light-chatBackground 
                hover:bg-brand-400 dark:hover:bg-light-backgroundHover 
                text-dark-text dark:text-light-text  
                transition ease-in duration-200 text-center text-base font-semibold shadow-md 
                focus:outline-none 
                rounded-lg "
                onClick={handleTutorial}
                disabled={isLoading}
              >
                Assim ficou ótimo! Obrigado! 😁
              </button>
            </div>
            {width < 993 && <ArrowBendRightUp size={32} color="#1d2daa" />}
          </div>
        </>
      )}
      {globalErrorMessage && <ShowErrors message={globalErrorMessage} />}
    </div>
  );
}