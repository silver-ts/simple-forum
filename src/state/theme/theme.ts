import create from 'zustand'
import { persist } from 'zustand/middleware'

type State = {
  theme: boolean
  toggleTheme: (value: boolean) => void
}

const themeStore = create(
  persist<State>((set) => ({
    theme: false,
    toggleTheme: (value) => set(() => ({ theme: value }))
  }))
)

export default themeStore
