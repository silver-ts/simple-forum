import { FC } from 'react'
import { Text } from '@components/Text'
import { Post } from '@constants/types'
import ShouldRender from '@components/ShouldRender'
import useFormattedDistanceToNow from '@utils/useFormattedDistanceToNow'

import * as S from './styles'

type Props = {
  post?: Post
  loading: boolean
  onClick?: () => void
}

const PostCard: FC<Props> = ({ post, loading, onClick }) => (
  <S.PostCard key={post?.id} onClick={onClick}>
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
          By {post?.author?.displayName}
        </Text>
        <Text loading={loading} shimmerWidth={100} type="big-label">
          {useFormattedDistanceToNow(Number(post?.createdAt))}
        </Text>
      </S.UserAndDateContainer>
      <ShouldRender if={post?.updatedAt}>
        <Text loading={loading} type="big-label">
          {`Updated
          ${useFormattedDistanceToNow(Number(post?.updatedAt))}`}
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
