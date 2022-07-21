/* eslint-disable import/no-duplicates */
import i18next from 'i18next'
import en from 'date-fns/locale/en-US'
import pt from 'date-fns/locale/pt-BR'
import it from 'date-fns/locale/it'

const useGetCurrentLocale = () => {
  const currentLanguage = i18next.language

  const locales = {
    pt,
    it,
    en
  }

  return locales[currentLanguage] ?? en
}

export default useGetCurrentLocale
