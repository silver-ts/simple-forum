import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import EN_US from '../public/locales/en/translation.json'

export const i18n = i18next.createInstance()

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    debug: false,
    lng: 'en',
    fallbackLng: 'en',
    resources: {
      en: {
        translation: EN_US
      }
    },
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
