import { FC, useEffect } from 'react'
import { ApolloProvider } from '@apollo/client'
import { GlobalStyle } from '@styles/global'
import { ThemeProvider } from 'styled-components'
import { ToastContainer } from 'react-toastify'
import themeStore from '@state/theme/theme'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { light, dark } from '@styles/theme'
import { LanguageSelector } from '@components/LanguageSelector'
import { Post } from '@pages/Post'
import { Home } from '@pages/Home'
import languageStore from '@state/language/language'
import i18next from 'i18next'
import client from './api/apollo-client'
import 'react-toastify/dist/ReactToastify.css'

import './i18n'

import './index.css'

const Application: FC = () => {
  const { theme } = themeStore((state) => state)
  const { language: storeLanguage } = languageStore()

  useEffect(() => {
    i18next.changeLanguage(storeLanguage)
  }, [storeLanguage])

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme === true ? light : dark}>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts/:id" element={<Post />} />
          </Routes>
          <LanguageSelector />
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
