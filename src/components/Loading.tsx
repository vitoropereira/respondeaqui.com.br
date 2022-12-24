import { CircleNotch } from "phosphor-react";

export function Loading() {
  return (
    <div className="w-12 h-12 flex items-center justify-center overflow-hidden">
      <CircleNotch
        weight="bold"
        className="w-9 h-9 text-brand-500 animate-spin"
      />
    </div>
  );
}
