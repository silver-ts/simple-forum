import { FC, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Text } from '@components/Text'
import { GET_POST_BY_ID } from '@constants/queries'
import { useTheme } from 'styled-components'
import { dark } from '@styles/theme'
import ShouldRender from '@components/ShouldRender'
import { PageWrapper } from '@pages/PageWrapper'
import { PostContent } from './PostContent'
import { Comment } from './Comment'

import * as S from './styles'

const Home: FC = () => {
  const { id } = useParams()

  const theme = useTheme()

  const { data, loading, error } = useQuery(GET_POST_BY_ID, {
    variables: { id }
  })

  const post = data?.post || []

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    toast.error(error?.message)
  }, [error])

  useEffect(() => {
    if (post?.title !== undefined) document.title = `Cluster - ${post?.title}`

    return () => {
      document.title = 'Cluster'
    }
  }, [post])

  return (
    <PageWrapper>
      <S.Container>
        <S.Content>
          <PostContent post={post} loading={loading} />
        </S.Content>
        <Text
          style={{ marginTop: '20px' }}
          type="medium-title"
          color={theme === dark ? 'system-contrast' : 'social-instagram'}
        >
          Comments
        </Text>
        <ShouldRender if={!loading}>
          {post?.comments?.map((comment) => (
            <Comment loading={loading} comment={comment} />
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

export default Home
