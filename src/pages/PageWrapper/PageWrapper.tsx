import { Header } from '@components/Header'
import React, { FC } from 'react'

type Props = {
  children: React.ReactNode
}

const PageWrapper: FC<Props> = (props) => {
  const { children } = props

  return (
    <>
      <Header />
      {children}
    </>
  )
}
export default PageWrapper
