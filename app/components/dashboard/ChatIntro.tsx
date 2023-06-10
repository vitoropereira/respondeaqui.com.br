import Logo from '../Logo'

export function ChatIntro() {
  return (
    <div
      className="flex h-full flex-col items-center 
      justify-center border-b-8 border-b-brand-500 bg-light-backgroundSecond dark:bg-dark-backgroundSecond 
      max-[994px]:hidden"
    >
      <Logo />
      <h1 className="mt-4 text-center text-3xl font-semibold text-light-lastMessage dark:text-dark-lastMessage">
        Responde aqui!
      </h1>

      <h2 className="mt-5 text-center text-sm font-normal leading-5 text-light-textSecondary dark:text-dark-textSecondary ">
        O RespondeAqui é a plataforma perfeita para discutir qualquer assunto
        com outras pessoas interessadas. <br />
        Conecte-se com outras pessoas e compartilhe suas experiências e ideias
        no RespondeAqui.
      </h2>
    </div>
  )
}
