import { Camera } from "phosphor-react";
import { FormEvent, useState } from "react";
import { ScreenshotButton } from "../ScreenshotButton";

interface FeedBackContentStepProps {
  onFeedbackSent: () => void;
}

export function FeedBackContentStep({
  onFeedbackSent,
}: FeedBackContentStepProps) {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState("");

  function handleSubmitFeedback(event: FormEvent) {
    event.preventDefault();
    console.log(`Feedback: ${comment}`);

    onFeedbackSent();
  }

  return (
    <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
      <textarea
        className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-400 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-zinc-500 focus:ring-1 focus:outline-none resize-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
        placeholder="Conte com detalhes o que está acontecendo..."
        onChange={(event) => setComment(event.target.value)}
      ></textarea>

      <footer className="flex gap-2 mt-2">
        <ScreenshotButton
          screenshot={screenshot}
          onScreenshotTook={setScreenshot}
        />
        <button
          type="submit"
          disabled={comment.length === 0}
          className="p-2 bg-brand-500 border-transparent rounded-4 flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
        >
          Enviar Feedback
        </button>
      </footer>
    </form>
  );
}
