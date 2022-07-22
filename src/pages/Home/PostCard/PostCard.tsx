import { FC } from 'react'
import { Text } from '@components/Text'
import useGetCurrentLocale from '@utils/useGetCurrentLocale/useGetCurrentLocale'
import ShouldRender from '@components/ShouldRender'
import { formatDistanceToNow } from 'date-fns'

import * as S from './styles'

type Post = {
  post?: {
    body: string
    id: string
    createdAt: string
    updatedAt: string
    title: string
    comments: {
      comment: string
      id: string
      user: {
        username: string
        displayName: string
        id: string
      }
    }
    author: {
      username: string
      displayName: string
      id: string
    }
  }
  loading: boolean
}

const PostCard: FC<Post> = ({ post, loading }) => (
  <S.PostCard key={post?.id}>
    <S.PostHeader>
      <Text loading={loading} shimmerWidth={300} type="medium-title">
        {post?.title}
      </Text>
      <S.UserAndDateContainer>
        <Text
          loading={loading}
          style={{ maxWidth: '230px' }}
          ellipsis
          type="big-label"
        >
          {post?.author?.displayName}
        </Text>
        <Text loading={loading} shimmerWidth={100} type="big-label">
          {formatDistanceToNow(Number(post?.createdAt || 0), {
            includeSeconds: true,
            locale: useGetCurrentLocale(),
            addSuffix: true
          })}
        </Text>
      </S.UserAndDateContainer>
      <ShouldRender if={post?.updatedAt}>
        <Text loading={loading} type="big-label">
          {`Updated
          ${formatDistanceToNow(Number(post?.updatedAt || 0), {
            includeSeconds: true,
            locale: useGetCurrentLocale(),
            addSuffix: true
          })}`}
        </Text>
      </ShouldRender>
    </S.PostHeader>
    <S.PostBodyContainer>
      <Text
        loading={loading}
        shimmerWidth="100%"
        shimmerLines={3}
        type="big-label"
        ellipsis
        numberOfLines={3}
        align="justify"
      >
        {post?.body}
      </Text>
    </S.PostBodyContainer>
  </S.PostCard>
)

export default PostCard
