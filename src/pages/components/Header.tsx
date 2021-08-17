import { RiQuestionAnswerLine } from "react-icons/ri"

const Header: React.FC = () => {
  return (
    <header className="flex justify-center py-4 md:py-6 itens-center">
      <h1 className="font-bold px-2 text-3xl">Colaboradores RespondeAqui</h1>
      <div>
        <RiQuestionAnswerLine className="w-6 h-6 text-blue-400 text-3xl" />
      </div>
    </header>
  )
}

export default Header