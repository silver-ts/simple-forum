import { FC } from 'react'
import { Text } from '@components/Text'
import { useTheme } from 'styled-components'
import { dark } from '@styles/theme'

import * as S from './styles'

const Footer: FC = () => {
  const theme = useTheme()

  const textColor = theme === dark ? 'system-contrast' : 'social-instagram'

  return (
    <S.Container>
      <S.Content>
        <Text type="small-title" color={textColor}>
          Powered by{' '}
          <S.Link
            color={textColor}
            href="https://github.com/leojuriolli7/clusters-api"
          >
            Clusters API
          </S.Link>{' '}
          - Made by{' '}
          <S.Link color={textColor} href="https://github.com/leojuriolli7/">
            leojuriolli7
          </S.Link>
        </Text>
      </S.Content>
    </S.Container>
  )
}

export default Footer
