import { ArrowLeft } from "phosphor-react";
import { CLoseButton } from "../CloseButton";

interface HeaderProps {
  title?: string;
  imagem?: string;
  onRestartFeedback?: () => void;
}

export function Header({ title, imagem, onRestartFeedback }: HeaderProps) {
  return (
    <header>
      {onRestartFeedback && (
        <button
          type="button"
          className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
          onClick={onRestartFeedback}
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>
      )}

      <span className="text-xl leading-6 flex items-center gap-2">
        {imagem && <img className="w-6 h-6" src={imagem} alt={title} />}
        {title}
      </span>
      <CLoseButton />
    </header>
  );
}
