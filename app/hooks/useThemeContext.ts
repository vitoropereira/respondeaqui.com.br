import { create } from 'zustand'

interface ThemeContextProps {
  mode: '' | 'dark'
  onChangeThemeToDark: () => void
  onChangeThemeToLight: () => void
}

const useThemeContext = create<ThemeContextProps>((set) => ({
  mode: 'dark',
  onChangeThemeToDark: () => set({ mode: 'dark' }),
  onChangeThemeToLight: () => set({ mode: '' }),
}))

export default useThemeContext
