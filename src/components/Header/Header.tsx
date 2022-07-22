import { FC, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Text } from '@components/Text'
import MockProfileImage from '@assets/images/profile-mock.png'
import Logo from '@assets/images/logo.svg'

import * as S from './styles'
import { ThemeSwitch } from './ThemeSwitch'

const Header: FC = () => {
  const navigate = useNavigate()

  const goTo = useCallback((to: string) => () => navigate(to), [])

  return (
    <S.Container>
      <S.Content>
        <S.LogoContainer onClick={goTo('/')}>
          <S.Logo src={Logo} />
          <Text color="social-instagram" type="big-title">
            Cluster
          </Text>
        </S.LogoContainer>
        <S.SettingsContainer>
          <S.Avatar src={MockProfileImage} />
          <ThemeSwitch />
        </S.SettingsContainer>
      </S.Content>
    </S.Container>
  )
}

export default Header
