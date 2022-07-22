import { FC, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { toast } from 'react-toastify'
import { HOMEPAGE_POSTS_QUERY } from '@constants/queries'
import { PageWrapper } from '@pages/PageWrapper'
import ShouldRender from '@components/ShouldRender'
import { PostCard } from './PostCard'

import * as S from './styles'

const Home: FC = () => {
  const { data, loading, error } = useQuery(HOMEPAGE_POSTS_QUERY)

  const posts = data?.posts || []

  useEffect(() => {
    toast.error(error?.message)
  }, [error])

  return (
    <PageWrapper>
      <S.Container>
        <S.Content>
          <ShouldRender if={!loading}>
            {posts?.map((post) => (
              <PostCard loading={loading} post={post} />
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
