import { FC, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '@components/Button'
import { Text } from '@components/Text'
import { useTheme } from 'styled-components'
import { dark } from '@styles/theme'
import Default from '@assets/images/user-default.jpg'
import useIsAuthenticated from '@utils/useIsAuthenticated'
import Logo from '@assets/images/logo.svg'
import authStore from '@state/auth/auth'

import ShouldRender from '../ShouldRender'
import { ThemeSwitch } from './ThemeSwitch'

import * as S from './styles'

const Header: FC = () => {
  const { t } = useTranslation()

  const { setToken } = authStore()

  const [isAuthenticated] = useIsAuthenticated()

  const navigate = useNavigate()

  const theme = useTheme()

  const goTo = useCallback((to: string) => () => navigate(to), [])

  const handleClickAvatar = useCallback(() => {
    setToken(undefined)
  }, [])

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
          <ShouldRender if={isAuthenticated}>
            <S.Avatar src={Default} onClick={handleClickAvatar} />
          </ShouldRender>

          <ShouldRender if={!isAuthenticated}>
            <Button
              width={100}
              label={t('login')}
              onClick={goTo('/login')}
              backgroundColor={
                theme === dark ? 'system-contrast' : 'social-instagram'
              }
              textColor="system-secondary"
            />
          </ShouldRender>
          <ThemeSwitch />
        </S.SettingsContainer>
      </S.Content>
    </S.Container>
  )
}

export default Header
