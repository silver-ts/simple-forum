import { FC } from 'react'
import { useQuery } from '@apollo/client'
import { formatDistanceToNow } from 'date-fns'
import { HOMEPAGE_POSTS_QUERY } from '@constants/queries'
import ShouldRender from '@components/ShouldRender'
import { PageWrapper } from '@pages/PageWrapper'
import { Text } from '@components/Text'
import useGetCurrentLocale from '@utils/useGetCurrentLocale/useGetCurrentLocale'

import * as S from './styles'

type Post = {
  body: string
  id: string
  createdAt: string
  updatedAt: string
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
              <S.PostHeader>
                <Text type="medium-title">{post?.title}</Text>
                <S.UserAndDateContainer>
                  <Text style={{ maxWidth: '230px' }} ellipsis type="big-label">
                    {post?.author?.displayName}
                  </Text>
                  <Text type="big-label">
                    {formatDistanceToNow(Number(post?.createdAt), {
                      includeSeconds: true,
                      locale: useGetCurrentLocale(),
                      addSuffix: true
                    })}
                  </Text>
                </S.UserAndDateContainer>
                <ShouldRender if={posts.updatedAt}>
                  <Text type="big-label">
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
                  type="big-label"
                  ellipsis
                  numberOfLines={4}
                  align="justify"
                >
                  {post?.body}
                </Text>
              </S.PostBodyContainer>
            </S.PostCard>
          ))}
        </S.Content>
      </S.Container>
    </PageWrapper>
  )
}

export default Home
