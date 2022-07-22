import { Header } from '@components/Header'
import { Footer } from '@components/Footer'
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
      <Footer />
    </>
  )
}
export default PageWrapper
