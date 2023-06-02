import { Chats } from "phosphor-react";

export function ChatIntro() {
  return (
    <div
      className="flex flex-col bg-light-backgroundSecond dark:bg-dark-backgroundSecond 
      justify-center items-center h-full border-b-8 border-b-brand-500 
      max-[994px]:hidden"
    >
      <Chats className="text-brand-500" style={{ fontSize: "250px" }} />
      <h1 className="text-3xl text-light-lastMessage dark:text-dark-lastMessage font-semibold mt-4 text-center">
        Responde aqui!
      </h1>

      <h2 className="text-sm font-normal mt-5 leading-5 text-center text-light-textSecondary dark:text-dark-textSecondary ">
        O RespondeAqui é a plataforma perfeita para discutir qualquer assunto
        com outras pessoas interessadas. <br />
        Conecte-se com outras pessoas e compartilhe suas experiências e ideias
        no RespondeAqui.
      </h2>
    </div>
  );
}
