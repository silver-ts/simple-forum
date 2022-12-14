import { FC, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Image } from '@components/Image'
import languageStore from '@state/language/language'
import i18next from 'i18next'
import { LANGUAGES } from './_constants'

import * as S from './styles'

const LanguageSelector: FC = () => {
  const { language: storeLanguage, toggleLanguage } = languageStore()
  const { t } = useTranslation()

  const setActiveAndChangeLanguage = useCallback(
    (value) => () => {
      toggleLanguage(value)
      i18next.changeLanguage(value)
    },
    [toggleLanguage, storeLanguage]
  )

  return (
    <S.Container>
      {LANGUAGES.map((language) => (
        <S.Button
          onClick={setActiveAndChangeLanguage(language.name)}
          key={language.id}
          value={language.name}
          isActive={storeLanguage === language.name}
          aria-label={t('changeLanguage', { language: language.name })}
        >
          <Image
            width="100%"
            height="100%"
            src={language.image}
            alt={t('countryFlag', { country: language.country })}
          />
        </S.Button>
      ))}
    </S.Container>
  )
}

export default LanguageSelector
