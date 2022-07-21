import { FC, useCallback } from 'react'
import Switch from 'react-switch'
import themeStore from '@state/theme/theme'

import * as S from './styles'

const ThemeSwitch: FC = () => {
  const { toggleTheme, theme } = themeStore()

  const changeTheme = useCallback(
    () => toggleTheme(!theme),
    [theme, toggleTheme]
  )

  return (
    <Switch
      checked={theme}
      onChange={changeTheme}
      uncheckedIcon={false}
      checkedIcon={false}
      height={20}
      handleDiameter={25}
      width={50}
      borderRadius={5}
      uncheckedHandleIcon={<S.DarkModeIcon />}
      onColor="#C13584"
      checkedHandleIcon={
        <S.LightModeIconContainer>
          <S.LightModeIcon />
        </S.LightModeIconContainer>
      }
    />
  )
}

export default ThemeSwitch
