import { RiQuestionAnswerLine } from "react-icons/ri";

interface HeaderProps {
  headline?: string;
}

const Header = ({ headline }: HeaderProps) => {
  return (
    <header className="flex justify-center py-4 md:py-6 itens-center">
      <h1 className="font-bold px-2 text-3xl">
        {!headline ? "Colaboradores RespondeAqui" : headline}
      </h1>
      <RiQuestionAnswerLine className="w-6 h-6 text-blue-400 text-3xl" />
    </header>
  );
};

export default Header;
