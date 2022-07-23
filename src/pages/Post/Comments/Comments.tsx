import { useQuery } from '@apollo/client'
import ShouldRender from '@components/ShouldRender'
import { Text } from '@components/Text'
import { GET_COMMENTS_BY_ID } from '@constants/queries'
import { User } from '@constants/types'
import useIsTheme from '@utils/useIsTheme'
import { FC, useEffect } from 'react'
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

  const { data, loading, error } = useQuery(GET_COMMENTS_BY_ID, {
    variables: { postId }
  })

  useEffect(() => {
    if (error) {
      toast.error(error?.message)
    }
  }, [error])

  const titleColor = useIsTheme('system-contrast', 'social-instagram')

  return (
    <>
      <Text
        style={{ marginTop: '20px' }}
        type="medium-title"
        color={titleColor}
      >
        {t('comments')}
      </Text>
      <CommentField loading={loading} />
      <ShouldRender if={!loading}>
        {data?.comments?.map((comment) => (
          <Comment
            key={comment?.user?.id}
            loading={loading}
            comment={comment}
            isAuthor={comment?.user?.id === user?.id}
          />
        ))}
      </ShouldRender>
      <ShouldRender if={loading}>
        {Array.from([0, 1, 2, 3, 4]).map(() => (
          <Comment loading />
        ))}
      </ShouldRender>
    </>
  )
}

export default Comments
