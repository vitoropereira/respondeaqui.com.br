import { InputHTMLAttributes, ReactNode } from 'react'
import SearchIcon from '@mui/icons-material/Search'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholderText: string
  icon?: boolean
}

export function Input({ placeholderText, icon, ...rest }: InputProps) {
  return (
    <div className="bg-light-background px-4 py-1 dark:bg-dark-background max-[994px]:w-screen">
      <div
        className={`flex h-10 items-center rounded-[10px] bg-light-backgroundSecond dark:bg-dark-backgroundSecond ${
          icon ? 'px-2' : 'pr-2'
        } py-0`}
      >
        {icon ? (
          <SearchIcon fontSize="small" style={{ color: '#919191' }} />
        ) : (
          ''
        )}
        <input
          type="search"
          className={`-mr-2 flex-1 rounded-[10px] border-0 bg-transparent text-light-text outline-0 dark:border-0
           dark:text-dark-text dark:outline-0`}
          placeholder={placeholderText}
          {...rest}
        />
      </div>
    </div>
  )
}
