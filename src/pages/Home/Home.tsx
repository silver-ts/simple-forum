import { FC, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { HOMEPAGE_POSTS_QUERY } from '@constants/queries'
import { Post } from '@constants/types'
import { PageWrapper } from '@pages/PageWrapper'
import ShouldRender from '@components/ShouldRender'
import { Text } from '@components/Text'
import useIsTheme from '@utils/useIsTheme'
import { PostCard } from './PostCard'

import * as S from './styles'

const Home: FC = () => {
  const { t } = useTranslation()

  const { data, loading, error } = useQuery(HOMEPAGE_POSTS_QUERY)

  const posts = data?.posts || []

  const navigate = useNavigate()

  const goTo = useCallback((to: string) => () => navigate(to), [])

  useEffect(() => {
    toast.error(error?.message)
  }, [error])

  const textColor = useIsTheme('system-contrast', 'social-instagram')

  return (
    <PageWrapper>
      <S.Container>
        <S.Content>
          <Text
            style={{
              marginTop: '20px',
              width: 'clamp(300px, 75%, 1400px)'
            }}
            type="big-title"
            color={textColor}
          >
            {t('posts')}
          </Text>
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
