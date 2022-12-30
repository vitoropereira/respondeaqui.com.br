interface ShowErrorsProps {
  message: string;
}
export function ShowErrors({ message }: ShowErrorsProps) {
  return (
    <span className="bg-light-background dark:bg-dark-background p-2">
      <p className="font-medium text-sm text-red-500 text-ellipsis">
        {message}
      </p>
    </span>
  );
}
