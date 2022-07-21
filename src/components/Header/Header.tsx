import { FC, useCallback } from 'react'
import { Image } from '@components/Image'
import Switch from 'react-switch'
import { Text } from '@components/Text'
import themeStore from '@state/theme/theme'
import MockProfileImage from '@assets/images/user-default.png'

import * as S from './styles'

const Header: FC = () => {
  const { toggleTheme, theme } = themeStore()

  const changeTheme = useCallback(
    () => toggleTheme(!theme),
    [theme, toggleTheme]
  )

  return (
    <S.Container>
      <S.Content>
        <Text type="big-title">Cluster</Text>
        <S.SettingsContainer>
          <Image
            rounded
            width={55}
            height={55}
            src={MockProfileImage}
            alt="User Image"
          />
          <Switch checked={theme} onChange={changeTheme} />
        </S.SettingsContainer>
      </S.Content>
    </S.Container>
  )
}

export default Header
