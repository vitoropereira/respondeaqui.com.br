import { FeedbackType, feedbackTypes } from "..";

interface FeedbackTypeStepProps {
  onFeedbackTypeChanged: (feedbackType: FeedbackType) => void;
}

export function FeedbackTypeStep({
  onFeedbackTypeChanged,
}: FeedbackTypeStepProps) {
  return (
    <div className="flex py-8 gab-2 w-full">
      {Object.entries(feedbackTypes).map(([key, value]) => {
        return (
          <button
            key={key}
            className="bg-zinc800 rounded-lg py-5  w-24 flex-1 flex-col items-center gap-2 border-2 border-transparent hoover:border-brand-500 focus:border-brand-500 hover:bg-brand-500 focus:bg-brand-500 focus:outline-none"
            onClick={() => onFeedbackTypeChanged(key as FeedbackType)}
          >
            <img
              className="w-12 h-12 rounded-full"
              src={value.image.src}
              alt={value.image.alt}
            />
            <span className="text-xl leading-6">{value.title}</span>
          </button>
        );
      })}
    </div>
  );
}
