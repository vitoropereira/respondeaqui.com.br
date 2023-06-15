import { RiQuestionAnswerLine } from 'react-icons/ri'

interface HeaderProps {
  headline?: string
}

const Header = ({ headline }: HeaderProps) => {
  return (
    <header className="itens-center flex justify-center py-4 md:py-6">
      <h1 className="px-2 text-3xl font-bold">
        {!headline ? 'RespondeAqui' : headline}
      </h1>
      <RiQuestionAnswerLine className="h-6 w-6 text-3xl text-blue-400" />
    </header>
  )
}

export default Header
