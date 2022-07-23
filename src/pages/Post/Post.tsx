import { FC, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import authStore from '@state/auth/auth'
import { GET_POST_BY_ID } from '@constants/queries'
import { PageWrapper } from '@pages/PageWrapper'
import { PostContent } from './PostContent'
import { Comments } from './Comments'

import * as S from './styles'

const Post: FC = () => {
  const { id } = useParams()

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
            isAuthor={post?.author?.id === user?.id}
          />
        </S.Content>
        <Comments user={user} />
      </S.Container>
    </PageWrapper>
  )
}

export default Post
