import { TbCircleDotted } from 'react-icons/tb'

interface LoaderProps {
  size: number
}

export function Loader({ size }: LoaderProps) {
  return (
    <div
      className={`w-${size} h-${size} flex items-center justify-center overflow-hidden`}
    >
      <TbCircleDotted
        className={`w-${size} h-${size} animate-spin text-brand-500`}
      />
    </div>
  )
}
