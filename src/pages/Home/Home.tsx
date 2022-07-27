import { FC, useCallback, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import useOnScreen from '@utils/useOnScreen'
import { useQuery } from '@apollo/client'
import { MdOutlineAdd } from 'react-icons/md'
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

  const bottomRef = useRef()
  const reachedBottom = useOnScreen(bottomRef)

  const { data, loading, error, fetchMore } = useQuery(HOMEPAGE_POSTS_QUERY, {
    fetchPolicy: 'cache-and-network',
    variables: {
      offset: 0,
      limit: 5
    }
  })

  const posts = data?.posts

  const navigate = useNavigate()

  const goTo = useCallback((to: string) => () => navigate(to), [])

  const handleCreatePostButton = useCallback(() => {
    if (isAuthenticated) {
      navigate('/create')
    }
    if (!isAuthenticated) {
      toast.info(t('loginToPost'))
    }
  }, [isAuthenticated])

  useEffect(() => {
    toast.error(error?.message)
  }, [error])

  const textColor = useIsTheme('system-contrast', 'social-instagram')

  useEffect(() => {
    if (reachedBottom) {
      fetchMore({
        variables: {
          offset: posts?.length,
          limit: 3
        }
      })
    }
  }, [reachedBottom])

  return (
    <PageWrapper>
      <S.Container>
        <S.Content>
          <S.TitleContainer>
            <Text tag="h1" type="big-title" color={textColor}>
              {t('posts')}
            </Text>
            <Button
              loading={loading}
              backgroundColor="social-instagram"
              onClick={handleCreatePostButton}
              width="75px"
              aria-label={t('createPost')}
            >
              <S.ButtonContent>
                <MdOutlineAdd color="white" size={20} />
              </S.ButtonContent>
            </Button>
          </S.TitleContainer>
          <ShouldRender if={!loading || posts?.length}>
            {posts?.map((post: Post) => (
              <PostCard
                key={post?.id}
                post={post}
                onClick={goTo(`posts/${post?.id}`)}
              />
            ))}
          </ShouldRender>

          <ShouldRender if={loading && !posts?.length}>
            {Array.from([0, 1, 2, 3, 4, 5]).map(() => (
              <PostCard loading />
            ))}
          </ShouldRender>
        </S.Content>
      </S.Container>
      <div ref={bottomRef} />
    </PageWrapper>
  )
}

export default Home
