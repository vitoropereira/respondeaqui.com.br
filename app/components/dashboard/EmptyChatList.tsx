'use client'

export function EmptyChatList() {
  return (
    <div
      className="flex 
                items-center 
                pl-2"
    >
      <div
        className="ml-2 flex h-full min-w-0 flex-1
                    flex-col flex-wrap 
                    justify-center border-b-light-border pr-4 dark:border-b-dark-text"
      >
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col items-start justify-start pl-1 text-base text-light-text dark:text-dark-text ">
            <h2 className="mt-5 text-center text-sm font-normal leading-5 text-light-textSecondary dark:text-dark-textSecondary ">
              Nenhum chat foi encontrado.
            </h2>
          </div>
        </div>
      </div>
    </div>
  )
}
