import { useQuery } from '@apollo/client'
import ShouldRender from '@components/ShouldRender'
import { Text } from '@components/Text'
import { GET_COMMENTS_BY_ID } from '@constants/queries'
import { User } from '@constants/types'
import useIsTheme from '@utils/useIsTheme'
import useOnScreen from '@utils/useOnScreen'
import { FC, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Comment } from './Comment'
import { CommentField } from './CommentField'

type Props = {
  user?: User
}

const Comments: FC<Props> = (props) => {
  const { t } = useTranslation()

  const { id: postId } = useParams()

  const { user } = props

  const { data, loading, error, fetchMore } = useQuery(GET_COMMENTS_BY_ID, {
    variables: { postId, offset: 0, limit: 5 },
    fetchPolicy: 'cache-and-network'
  })

  const bottomRef = useRef()
  const reachedBottom = useOnScreen(bottomRef)

  useEffect(() => {
    if (error) {
      toast.error(error?.message)
    }
  }, [error])

  const titleColor = useIsTheme('system-contrast', 'social-instagram')

  useEffect(() => {
    if (reachedBottom) {
      fetchMore({
        variables: {
          offset: data?.comments?.length,
          limit: 10
        }
      })
    }
  }, [reachedBottom])

  return (
    <>
      <Text
        style={{ marginTop: '20px' }}
        tag="h2"
        type="medium-title"
        color={titleColor}
      >
        {t('comments')}
      </Text>
      <CommentField loading={loading} />
      <ShouldRender if={!loading || data?.comments?.length}>
        {data?.comments?.map((comment) => (
          <Comment
            key={comment?.id}
            loading={loading}
            comment={comment}
            isAuthor={comment?.user?.id === user?.id}
          />
        ))}
      </ShouldRender>
      <ShouldRender if={loading && !data?.comments?.length}>
        {Array.from([0, 1, 2, 3, 4]).map(() => (
          <Comment loading />
        ))}
      </ShouldRender>
      <div ref={bottomRef} />
    </>
  )
}

export default Comments
