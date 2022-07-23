import { FC, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Text } from '@components/Text'
import { useTranslation } from 'react-i18next'
import authStore from '@state/auth/auth'
import { GET_POST_BY_ID } from '@constants/queries'
import { useTheme } from 'styled-components'
import { dark } from '@styles/theme'
import ShouldRender from '@components/ShouldRender'
import { PageWrapper } from '@pages/PageWrapper'
import { PostContent } from './PostContent'
import { Comment } from './Comment'

import * as S from './styles'

const Post: FC = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const theme = useTheme()

  const { data, loading, error } = useQuery(GET_POST_BY_ID, {
    variables: { id }
  })

  const post = data?.post || []

  const { user } = authStore()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    toast.error(error?.message)
  }, [error])

  useEffect(() => {
    if (post?.title !== undefined) document.title = post?.title

    return () => {
      document.title = 'Cluster'
    }
  }, [post])

  return (
    <PageWrapper>
      <S.Container>
        <S.Content>
          <PostContent
            post={post}
            loading={loading}
            isAuthor={post?.author?.id === user.id}
          />
        </S.Content>
        <Text
          style={{ marginTop: '20px' }}
          type="medium-title"
          color={theme === dark ? 'system-contrast' : 'social-instagram'}
        >
          {t('comments')}
        </Text>
        <ShouldRender if={!loading}>
          {post?.comments?.map((comment) => (
            <Comment
              key={comment?.user?.id}
              loading={loading}
              comment={comment}
              isAuthor={comment?.user?.id === user.id}
            />
          ))}
        </ShouldRender>
        <ShouldRender if={loading}>
          {Array.from([0, 1, 2, 3, 4]).map(() => (
            <Comment loading />
          ))}
        </ShouldRender>
      </S.Container>
    </PageWrapper>
  )
}

export default Post
