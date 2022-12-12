import { Chats } from "phosphor-react";

export function ChatIntro() {
  return (
    <div className="flex flex-col bg-light-backgroundSecond dark:bg-dark-backgroundSecond justify-center items-center h-full border-b-8 border-b-brand-500 max-[994px]:hidden">
      <Chats className="text-brand-500" style={{ fontSize: "250px" }} />
      <h1 className="text-3xl text-light-lastMessage dark:text-dark-lastMessage font-semibold mt-4 text-center">
        Responde aqui!
      </h1>

      <h2 className="text-sm font-normal mt-5 leading-5 text-center text-light-textSecondary dark:text-dark-textSecondary ">
        Aqui você consegue tirar suas dúvidas e ajudar outras pessoas a
        retirarem as próprias dúvidas. <br />
        Tudo em uma plataforma dinâmica e segura.
      </h2>

      {/* <span className="text-light-textSecondary dark:text-dark-textSecondary fixed bottom-4 flex justify-center items-center">
        <LockIcon style={{ fontSize: "18px" }} /> Protegido com a criptografia
        de ponta a ponta
      </span> */}
    </div>
  );
}
