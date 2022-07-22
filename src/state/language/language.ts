import create from 'zustand'
import { persist } from 'zustand/middleware'

type State = {
  language: 'en' | 'pt'
  toggleLanguage: (value: 'en' | 'pt') => void
}

const languageStore = create(
  persist<State>((set) => ({
    language: 'pt',
    toggleLanguage: (value) => set(() => ({ language: value }))
  }))
)

export default languageStore
