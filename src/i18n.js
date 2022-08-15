import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import translationEN from './locales/en/translation.json'
import translationPT from './locales/pt/translation.json'

const resources = {
  en: {
    translation: translationEN
  },
  pt: {
    translation: translationPT
  }
}

const Languages = ['en', 'pt']
i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'en',
  debug: true,
  interpolation: {
    escapeValue: false
  }
})

export default i18n
