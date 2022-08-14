import create from 'zustand'
import { persist } from 'zustand/middleware'

type State = {
  theme: boolean
  toggleTheme: (value: boolean) => void
}

const isDarkMode = matchMedia('(prefers-color-scheme: dark)').matches

const themeStore = create(
  persist<State>((set) => ({
    theme: isDarkMode,
    toggleTheme: (value) => set(() => ({ theme: value }))
  }))
)

export default themeStore
