'use client'

interface HeadingProps {
  title: string
  subtitle?: string
  center?: boolean
}

const Heading = ({ title, subtitle, center }: HeadingProps) => {
  return (
    <div className={center ? 'text-center' : 'text-start'}>
      <div className="text-2xl font-bold">{title}</div>
      <div className="mt-2 font-light text-neutral-500">{subtitle}</div>
    </div>
  )
}

export default Heading
