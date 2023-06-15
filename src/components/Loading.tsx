import { CircleNotch } from 'phosphor-react'

interface LoadingProps {
  size: number
}

export function Loading({ size }: LoadingProps) {
  return (
    <div
      className={`w-${size} h-${size} flex items-center justify-center overflow-hidden`}
    >
      <CircleNotch
        weight="bold"
        className={`w-${size} h-${size} animate-spin text-brand-500`}
      />
    </div>
  )
}
