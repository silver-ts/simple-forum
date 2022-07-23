import { FC } from 'react'
import { Text } from '@components/Text'
import { useTranslation, Trans } from 'react-i18next'
import { useTheme } from 'styled-components'
import { dark } from '@styles/theme'

import * as S from './styles'

const Footer: FC = () => {
  const { t } = useTranslation()
  const theme = useTheme()

  const textColor = theme === dark ? 'system-contrast' : 'social-instagram'

  return (
    <S.Container>
      <S.Content>
        <Text type="small-title" color={textColor}>
          <Trans
            t={t}
            i18nKey="poweredByClusters"
            components={[
              <S.Link
                color={textColor}
                href="https://github.com/leojuriolli7/clusters-api"
              />,
              <S.Link
                color={textColor}
                href="https://github.com/leojuriolli7/"
              />
            ]}
          />
        </Text>
      </S.Content>
    </S.Container>
  )
}

export default Footer