import { FC, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import Switch from 'react-switch'
import themeStore from '@state/theme/theme'

import * as S from './styles'

const ThemeSwitch: FC = () => {
  const { t } = useTranslation()
  const { toggleTheme, theme } = themeStore()

  const changeTheme = useCallback(
    () => toggleTheme(!theme),
    [theme, toggleTheme]
  )

  return (
    <Switch
      aria-label={t('switchTheme')}
      checked={theme}
      onChange={changeTheme}
      uncheckedIcon={false}
      checkedIcon={false}
      height={20}
      handleDiameter={25}
      width={50}
      borderRadius={5}
      checkedHandleIcon={<S.DarkModeIcon />}
      offColor="#C13584"
      onColor="#888"
      uncheckedHandleIcon={
        <S.LightModeIconContainer>
          <S.LightModeIcon />
        </S.LightModeIconContainer>
      }
    />
  )
}

export default ThemeSwitch
