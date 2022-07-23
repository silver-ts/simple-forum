import { FC, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { HOMEPAGE_POSTS_QUERY } from '@constants/queries'
import useIsAuthenticated from '@utils/useIsAuthenticated'
import { Post } from '@constants/types'
import { PageWrapper } from '@pages/PageWrapper'
import ShouldRender from '@components/ShouldRender'
import { Button } from '@components/Button'
import { Text } from '@components/Text'
import useIsTheme from '@utils/useIsTheme'
import { PostCard } from './PostCard'

import * as S from './styles'

const Home: FC = () => {
  const { t } = useTranslation()

  const [isAuthenticated] = useIsAuthenticated()

  const { data, loading, error } = useQuery(HOMEPAGE_POSTS_QUERY, {})

  const posts = data?.posts || []

  const navigate = useNavigate()

  const goTo = useCallback((to: string) => () => navigate(to), [])

  useEffect(() => {
    toast.error(error?.message)
  }, [error])

  const textColor = useIsTheme('system-contrast', 'social-instagram')
  const buttonColor = useIsTheme('system-contrast', 'social-instagram')
  const buttonTextColor = useIsTheme('system-secondary', 'status-contrast')

  return (
    <PageWrapper>
      <S.Container>
        <S.Content>
          <S.TitleContainer>
            <Text type="big-title" color={textColor}>
              {t('posts')}
            </Text>
            <ShouldRender if={isAuthenticated}>
              <Button
                label={t('create')}
                onClick={goTo('create')}
                width="150px"
                backgroundColor={buttonColor}
                textColor={buttonTextColor}
              />
            </ShouldRender>
          </S.TitleContainer>
          <ShouldRender if={!loading}>
            {posts?.map((post: Post) => (
              <PostCard
                key={post?.id}
                loading={loading}
                post={post}
                onClick={goTo(`posts/${post?.id}`)}
              />
            ))}
          </ShouldRender>

          <ShouldRender if={loading || !posts.length}>
            {Array.from([0, 1, 2, 3, 4, 5]).map(() => (
              <PostCard loading />
            ))}
          </ShouldRender>
        </S.Content>
      </S.Container>
    </PageWrapper>
  )
}

export default Home
