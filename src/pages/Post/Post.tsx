import { FC, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { GET_POST_BY_ID } from '@constants/queries'
import { PageWrapper } from '@pages/PageWrapper'

import * as S from './styles'
import { PostContent } from './PostContent'

const Home: FC = () => {
  const { id } = useParams()

  const { data, loading, error } = useQuery(GET_POST_BY_ID, {
    variables: { id }
  })

  const post = data?.post || []

  useEffect(() => {
    toast.error(error?.message)
  }, [error])

  return (
    <PageWrapper>
      <S.Container>
        <S.Content>
          <PostContent post={post} loading={loading} />
        </S.Content>
      </S.Container>
    </PageWrapper>
  )
}

export default Home
