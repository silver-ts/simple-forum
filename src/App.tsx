import { FC } from 'react'
import { ApolloProvider } from '@apollo/client'
import { GlobalStyle } from '@styles/global'
import { ThemeProvider } from 'styled-components'
import themeStore from '@state/theme/theme'
import { light, dark } from '@styles/theme'
import { Home } from './pages/Home'
import client from './api/apollo-client'
import './index.css'

const Application: FC = () => {
  const { theme } = themeStore((state) => state)
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme === true ? light : dark}>
        <GlobalStyle />
        <Home />
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default Application
