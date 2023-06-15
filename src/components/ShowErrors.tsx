interface ShowErrorsProps {
  message: string
}
export function ShowErrors({ message }: ShowErrorsProps) {
  return (
    <span className="bg-light-background p-2 dark:bg-dark-background">
      <p className="text-ellipsis text-sm font-medium text-red-500">
        {message}
      </p>
    </span>
  )
}
