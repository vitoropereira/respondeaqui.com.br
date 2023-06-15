import { createContext, useState } from 'react'

interface ThemeContextProps {
  mode: '' | 'dark'
  changeTheme: (theme: boolean) => void
}

export const ThemeContext = createContext({} as ThemeContextProps)

export function ThemeContextProvider({ children }) {
  const [mode, setMode] = useState('')

  const changeTheme = (theme: boolean) => {
    if (theme) {
      setMode('dark')
    } else {
      setMode('')
    }
  }

  return (
    <ThemeContext.Provider value={{ mode: '', changeTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
