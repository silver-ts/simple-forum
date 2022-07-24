import { FC, useEffect } from 'react'
import i18next from 'i18next'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import themeStore from '@state/theme/theme'
import { ApolloProvider } from '@apollo/client'
import { GlobalStyle } from '@styles/global'
import { light, dark } from '@styles/theme'
import { LanguageSelector } from '@components/LanguageSelector'
import { ProtectedRoute } from '@components/ProtectedRoute'
import languageStore from '@state/language/language'
import { CreatePost } from '@pages/CreatePost'
import { Post } from '@pages/Post'
import { Register } from '@pages/Register'
import { Login } from '@pages/Login'
import { Error } from '@pages/Error'
import { Home } from '@pages/Home'

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
            <Route
              path="/login"
              element={
                <ProtectedRoute isAuthPage>
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route
              path="/register"
              element={
                <ProtectedRoute isAuthPage>
                  <Register />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create"
              element={
                <ProtectedRoute>
                  <CreatePost />
                </ProtectedRoute>
              }
            />
            <Route path="/*" element={<Error />} />
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
