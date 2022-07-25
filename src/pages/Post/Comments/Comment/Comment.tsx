import { FC, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Text } from '@components/Text'
import { useMutation } from '@apollo/client'
import useIsAuthenticated from '@utils/useIsAuthenticated'
import useFormattedDistanceToNow from '@utils/useFormattedDistanceToNow'
import { toast } from 'react-toastify'
import ShouldRender from '@components/ShouldRender'
import { Comment as CommentType } from '@constants/types'
import { GET_COMMENTS_BY_ID } from '@constants/queries'
import { DELETE_COMMENT_BY_ID } from '@constants/mutations'

import { CommentField } from '../CommentField'
import * as S from './styles'

type Props = {
  comment?: CommentType
  isAuthor?: boolean
  loading: boolean
}

const Comment: FC<Props> = ({ comment, loading, isAuthor }) => {
  const [showField, setShowField] = useState(false)
  const { t } = useTranslation()
  const [isAuthenticated] = useIsAuthenticated()

  const [deleteComment, { loading: deleting, error }] = useMutation(
    DELETE_COMMENT_BY_ID,
    {
      optimisticResponse: true,
      refetchQueries: [GET_COMMENTS_BY_ID]
    }
  )

  const handleClickDelete = useCallback(() => {
    deleteComment({
      variables: {
        id: comment?.id
      }
    })
  }, [])

  const handleClickEdit = useCallback(() => {
    setShowField(!showField)
  }, [showField])

  useEffect(() => {
    if (error) {
      toast.error(error?.message)
    }
  }, [error])

  useEffect(() => {
    if (!isAuthenticated) {
      setShowField(false)
    }
  }, [isAuthenticated])

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
      <ShouldRender if={!showField}>
        <S.CommentText>
          <Text
            loading={loading}
            shimmerWidth="100%"
            shimmerLines={3}
            type="big-label"
            ellipsis
            numberOfLines={5}
            align="justify"
            style={{ whiteSpace: 'pre-wrap' }}
          >
            {comment?.comment}
          </Text>
        </S.CommentText>
      </ShouldRender>
      <ShouldRender if={showField}>
        <CommentField
          isEdit
          comment={comment}
          loading={loading}
          setShowField={setShowField}
        />
      </ShouldRender>
      <ShouldRender if={!showField}>
        <S.ActionsContainer>
          <ShouldRender if={isAuthor && !deleting}>
            <S.ActionText loading={loading} onClick={handleClickDelete}>
              {t('delete')}
            </S.ActionText>
            <S.ActionText loading={loading} onClick={handleClickEdit}>
              {t('edit')}
            </S.ActionText>
          </ShouldRender>
        </S.ActionsContainer>
      </ShouldRender>
    </S.Comment>
  )
}

export default Comment
