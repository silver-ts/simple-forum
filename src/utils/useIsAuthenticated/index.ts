import authStore from '@state/auth/auth'

const useIsAuthenticated = () => {
  const { token } = authStore()

  const isAuthenticated = !!token

  return [isAuthenticated]
}

export default useIsAuthenticated
