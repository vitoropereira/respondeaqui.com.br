import { Popover } from "@headlessui/react";
import { X } from "phosphor-react";

export function CLoseButton() {
  return (
    <Popover.Button
      className="top-5 right-5 absolute text-zinc-400 houver:text-zinc-100"
      title="Fechar formulário."
    >
      {" "}
      <X className="w-4 h-4" weight="bold" />
    </Popover.Button>
  );
}
