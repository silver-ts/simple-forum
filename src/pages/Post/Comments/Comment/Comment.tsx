import { FC, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Text } from '@components/Text'
import { useMutation } from '@apollo/client'
import useFormattedDistanceToNow from '@utils/useFormattedDistanceToNow'
import { toast } from 'react-toastify'
import ShouldRender from '@components/ShouldRender'
import { Comment as CommentType } from '@constants/types'
import { GET_COMMENTS_BY_ID } from '@constants/queries'
import { DELETE_COMMENT_BY_ID } from '@constants/mutations'

import * as S from './styles'

type Props = {
  comment?: CommentType
  isAuthor?: boolean
  loading: boolean
}

const Comment: FC<Props> = ({ comment, loading, isAuthor }) => {
  const { t } = useTranslation()

  const [deleteComment, { loading: deleting, error }] = useMutation(
    DELETE_COMMENT_BY_ID,
    {
      optimisticResponse: true,
      refetchQueries: [GET_COMMENTS_BY_ID]
    }
  )

  const handleClick = useCallback(() => {
    deleteComment({
      variables: {
        id: comment?.id
      }
    })
  }, [])

  useEffect(() => {
    if (error) {
      toast.error(error?.message)
    }
  }, [error])

  return (
    <S.Comment>
      <S.CommentInfo>
        <Text
          type="super-big-label"
          loading={loading}
          shimmerWidth="300px"
          color={isAuthor ? 'social-instagram' : 'system-contrast'}
        >
          {comment?.user.displayName}{' '}
          <Text
            tag="span"
            type="medium-label"
            loading={loading}
            shimmerWidth={100}
          >
            {useFormattedDistanceToNow(Number(comment?.createdAt))}
          </Text>
        </Text>

        <ShouldRender if={comment?.updatedAt !== comment?.createdAt}>
          <Text type="medium-label" loading={loading} shimmerWidth={100}>
            {t('updatedAt', {
              time: useFormattedDistanceToNow(Number(comment?.updatedAt))
            })}
          </Text>
        </ShouldRender>
      </S.CommentInfo>
      <S.CommentText>
        <Text
          loading={loading}
          shimmerWidth="100%"
          shimmerLines={3}
          type="big-label"
          ellipsis
          numberOfLines={5}
          align="justify"
        >
          {comment?.comment}
        </Text>
      </S.CommentText>
      <ShouldRender if={isAuthor && !deleting}>
        <S.DeleteText loading={loading} onClick={handleClick}>
          {t('delete')}
        </S.DeleteText>
      </ShouldRender>
    </S.Comment>
  )
}

export default Comment
