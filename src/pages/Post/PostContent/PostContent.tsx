import { FC } from 'react'
import useFormattedDistanceToNow from '@utils/useFormattedDistanceToNow'
import { Post } from '@constants/types'
import { Text } from '@components/Text'

import * as S from './styles'

type Props = {
  post?: Post
  loading: boolean
}

const Home: FC<Props> = ({ post, loading }) => (
  <S.PostText>
    <S.PostInfo>
      <Text
        loading={loading}
        shimmerWidth="clamp(250px, 50%, 550px)"
        type="medium-title"
      >
        {post?.title}
      </Text>
      <S.PostDates>
        <Text loading={loading} type="medium-label" shimmerWidth={100}>
          Posted {useFormattedDistanceToNow(Number(post?.createdAt))}
        </Text>
        <Text loading={loading} type="medium-label" shimmerWidth={100}>
          Updated at {useFormattedDistanceToNow(Number(post?.updatedAt))}
        </Text>
      </S.PostDates>
      <Text
        loading={loading}
        ellipsis
        type="super-big-label"
        shimmerWidth={150}
      >
        By {post?.author?.displayName}
      </Text>
    </S.PostInfo>
    <S.PostBodyContainer>
      <Text
        loading={loading}
        shimmerWidth="100%"
        shimmerLines={3}
        type="big-label"
        ellipsis
        numberOfLines={5}
        align="justify"
      >
        {post?.body}
      </Text>
    </S.PostBodyContainer>
  </S.PostText>
)

export default Home
