import { FC } from 'react'
import { Text } from '@components/Text'
import MockProfileImage from '@assets/images/profile-mock.png'
import Logo from '@assets/images/logo.svg'

import * as S from './styles'
import { ThemeSwitch } from './ThemeSwitch'

const Header: FC = () => (
  <S.Container>
    <S.Content>
      <S.LogoContainer>
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

export default Header
