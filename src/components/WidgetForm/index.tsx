import { useState } from "react";
import { Header } from "./Header";
import { FeedBackContentStep } from "./Steps/FeedbackContentStep";
import { FeedBackSuccessStep } from "./Steps/FeedbackSuccessStep";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";

export const feedbackTypes = {
  BUG: {
    title: "Problema",
    image: {
      src: "/images/bug.svg",
      alt: "Imagem de um inseto",
    },
  },
  IDEA: {
    title: "Ideia",
    image: {
      src: "/images/idea.svg",
      alt: "Imagem de uma lâmpada",
    },
  },
  OTHER: {
    title: "Outro",
    image: {
      src: "/images/thought.svg",
      alt: "Imagem de um balão de pensamento",
    },
  },
};

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  function handleRestartFeedback() {
    setFeedbackSent(false);
    setFeedbackType(null);
  }

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
      {feedbackSent ? (
        <FeedBackSuccessStep onFeedbackRestartRequest={handleRestartFeedback} />
      ) : (
        <>
          {!feedbackType ? (
            <>
              <Header title="Deixe seu Feedback" />
              <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
            </>
          ) : (
            <>
              <Header
                title={feedbackTypes[feedbackType].title}
                imagem={feedbackTypes[feedbackType].image.src}
                onRestartFeedback={handleRestartFeedback}
              />
              <FeedBackContentStep
                onFeedbackSent={() => setFeedbackSent(true)}
                feedbackType={feedbackType}
              />
            </>
          )}
        </>
      )}

      <footer className="text-xs text-neutral-400">
        Feito com amor!{" "}
        <a
          href="https://www.portaldev.digital/"
          className="underline underline-offset-2"
          target="_blank"
          rel="noreferrer"
        >
          Portal dev.
        </a>
      </footer>
    </div>
  );
}
