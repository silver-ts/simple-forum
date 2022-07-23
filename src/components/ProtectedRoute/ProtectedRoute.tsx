import useIsAuthenticated from '@utils/useIsAuthenticated'
import React, { FC, ReactElement } from 'react'
import { Navigate } from 'react-router-dom'

type Props = {
  children: ReactElement
}

const ProtectedRoute: FC<Props> = ({ children }) => {
  const [isAuthenticated] = useIsAuthenticated()

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return React.cloneElement(children)
}

export default ProtectedRoute
