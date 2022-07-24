import { FC, useCallback } from 'react'
import { Text } from '@components/Text'
import { useNavigate } from 'react-router-dom'
import { PageWrapper } from '@pages/PageWrapper'
import Lottie from 'react-lottie'
import { useTranslation } from 'react-i18next'

import { LOTTIE_OPTIONS } from './_constants'
import * as S from './styles'

const Error: FC = () => {
  const { t } = useTranslation()

  const navigate = useNavigate()

  const goTo = useCallback(
    (value: string) => () => {
      navigate(value)
    },
    []
  )

  return (
    <PageWrapper noFooter>
      <S.Container>
        <S.Content>
          <Lottie options={LOTTIE_OPTIONS} width="100%" />
          <Text
            align="center"
            type="medium-title"
            style={{ margin: '20px 10px 0 10px', lineHeight: 1.2 }}
          >
            {t('pageNotFound')}
          </Text>
          <Text
            tag="a"
            underline
            type="super-big-label"
            style={{ marginTop: '20px', cursor: 'pointer' }}
            onClick={goTo('/')}
          >
            {t('goBackHome')}
          </Text>
        </S.Content>
      </S.Container>
    </PageWrapper>
  )
}

export default Error
