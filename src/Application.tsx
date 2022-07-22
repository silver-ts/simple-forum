import { FC } from 'react'
import { ApolloProvider } from '@apollo/client'
import { GlobalStyle } from '@styles/global'
import { ThemeProvider } from 'styled-components'
import { ToastContainer } from 'react-toastify'
import themeStore from '@state/theme/theme'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { light, dark } from '@styles/theme'
import { Home } from './pages/Home'
import client from './api/apollo-client'
import 'react-toastify/dist/ReactToastify.css'

import './index.css'

const Application: FC = () => {
  const { theme } = themeStore((state) => state)
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme === true ? light : dark}>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
      <ToastContainer
        draggable
        position="top-center"
        theme={theme ? 'light' : 'dark'}
      />
    </ApolloProvider>
  )
}

export default Application
