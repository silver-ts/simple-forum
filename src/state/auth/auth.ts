import create from 'zustand'
import { persist } from 'zustand/middleware'

type User = {
  displayName: string
  username: string
  id: string
}

type State = {
  token: string | undefined
  user: User | undefined
  setToken: (value) => void
  setUser: (value) => void
}

const authStore = create(
  persist<State>((set) => ({
    token: undefined,
    setToken: (value) => set(() => ({ token: value })),
    user: {
      username: undefined,
      displayName: undefined,
      id: undefined
    },
    setUser: (value: User) =>
      set(() => ({
        user: {
          username: value?.username,
          displayName: value?.displayName,
          id: value?.id
        }
      }))
  }))
)

export default authStore
