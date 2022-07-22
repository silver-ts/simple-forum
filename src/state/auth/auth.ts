import create from 'zustand'
import { persist } from 'zustand/middleware'

type State = {
  token: string | undefined
  setToken: (value) => void
}

const authStore = create(
  persist<State>((set) => ({
    token: undefined,
    setToken: (value) => set(() => ({ token: value }))
  }))
)

export default authStore
