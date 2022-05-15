import { Header } from "../Header";

interface FeedbackSuccessStepProps {
  onFeedbackRestartRequest: () => void;
}

export function FeedBackSuccessStep({
  onFeedbackRestartRequest,
}: FeedbackSuccessStepProps) {
  return (
    <>
      <Header />

      <div className="flex flex-col items-center py-10 w-[384px] ">
        <img src="success.svg" alt="Imagem de um balão de pensamento" />

        <span className="text-xl mt-2">Agradecemos pelo feedback!</span>

        <button
          type="button"
          onClick={onFeedbackRestartRequest}
          className="py-2 px-6 mt-6 bg-zinc-800 rounded-4 border-transparent text-sm leading-6 hover:bg-zinc-700 transition-colors focus:border-brand-500 focus:bg-brand-500 focus:outline-none"
        >
          Quero enviar outro feedback.
        </button>
      </div>
    </>
  );
}
