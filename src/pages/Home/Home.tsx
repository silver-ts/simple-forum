import { FC } from 'react'
import { useQuery } from '@apollo/client'
import { HOMEPAGE_POSTS_QUERY } from '@constants/queries'
import { PageWrapper } from '@pages/PageWrapper'
import { Text } from '@components/Text'

import * as S from './styles'

type Post = {
  body: string
  id: string
  createdAt: string
  title: string
  comments: {
    comment: string
    id: string
    author: {
      username: string
      displayName: string
      id: string
    }
  }
  author: any
}

const Home: FC = () => {
  const { data, loading, error } = useQuery(HOMEPAGE_POSTS_QUERY)

  const posts = data?.posts || []

  return (
    <PageWrapper>
      <S.Container>
        <S.Content>
          {posts?.map((post: Post) => (
            <S.PostCard key={post?.id}>
              <Text type="medium-title">{post?.title}</Text>
            </S.PostCard>
          ))}
        </S.Content>
      </S.Container>
    </PageWrapper>
  )
}

export default Home
