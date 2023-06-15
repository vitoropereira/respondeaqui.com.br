import { Popover } from '@headlessui/react'
import { X } from 'phosphor-react'

export function CLoseButton() {
  return (
    <Popover.Button
      className="houver:text-zinc-100 absolute right-5 top-5 text-zinc-400"
      title="Fechar formulário."
    >
      {' '}
      <X className="h-4 w-4" weight="bold" />
    </Popover.Button>
  )
}
