import create from 'zustand'
import { persist } from 'zustand/middleware'

// type State = {
//   theme: boolean
//   toggleTheme: (value: boolean) => void
// }

// eslint-disable-next-line
const themeStore = create<any>(
  persist((set) => ({
    theme: true,
    toggleTheme: (value) => set(() => ({ theme: value }))
  }))
)

export default themeStore
