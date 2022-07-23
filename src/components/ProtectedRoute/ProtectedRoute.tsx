import useIsAuthenticated from '@utils/useIsAuthenticated'
import React, { FC, ReactElement } from 'react'
import { Navigate } from 'react-router-dom'

type Props = {
  children: ReactElement
  isAuthPage?: boolean
}

const ProtectedRoute: FC<Props> = ({ children, isAuthPage = false }) => {
  const [isAuthenticated] = useIsAuthenticated()

  if (isAuthenticated && isAuthPage) {
    return <Navigate to="/" replace />
  }

  if (!isAuthenticated && !isAuthPage) {
    return <Navigate to="/" replace />
  }

  return React.cloneElement(children)
}

export default ProtectedRoute
