import { useMutation } from '@apollo/client'
import { Button } from '@components/Button'
import { Field } from '@components/Field'
import ShouldRender from '@components/ShouldRender'
import { ADD_COMMENT, EDIT_COMMENT_BY_ID } from '@constants/mutations'
import { GET_COMMENTS_BY_ID } from '@constants/queries'
import { Comment } from '@constants/types'
import useIsAuthenticated from '@utils/useIsAuthenticated'
import useIsTheme from '@utils/useIsTheme'
import { Dispatch, FC, SetStateAction, useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import * as S from './styles'

type Props = {
  loading: boolean
  isEdit?: boolean
  comment?: Comment
  setShowField?: Dispatch<SetStateAction<boolean>>
}

const CommentField: FC<Props> = ({
  loading,
  isEdit = false,
  comment,
  setShowField
}) => {
  const { t } = useTranslation()

  const { id: postId } = useParams()

  const [isAuthenticated] = useIsAuthenticated()

  const [createComment, { loading: creating, error: createCommentError }] =
    useMutation(ADD_COMMENT, {
      optimisticResponse: true,
      refetchQueries: [GET_COMMENTS_BY_ID]
    })

  const [editComment, { loading: editing, error: editCommentError }] =
    useMutation(EDIT_COMMENT_BY_ID, {
      optimisticResponse: true,
      refetchQueries: [GET_COMMENTS_BY_ID]
    })

  const { control, handleSubmit, setValue, watch } = useForm()
  const watchCommment = watch('comment', '')

  const handleClick = useCallback(
    (payload) => {
      if (isAuthenticated && !isEdit) {
        createComment({
          variables: {
            postId,
            comment: payload.comment
          }
        }).then(() => {
          setValue('comment', '')
        })
      }

      if (isAuthenticated && isEdit) {
        editComment({
          variables: {
            id: comment?.id,
            comment: payload.comment
          }
        }).then(() => {
          setValue('comment', '')
        })
      }

      if (!isAuthenticated) {
        toast.info(t('loginToComment'))
      }
    },
    [isAuthenticated]
  )

  useEffect(() => {
    if (createCommentError && isAuthenticated) {
      toast.error(createCommentError?.message)
    }

    if (editCommentError && isAuthenticated) {
      toast.error(editCommentError?.message)
    }
  }, [createCommentError, editCommentError, isAuthenticated])

  useEffect(() => {
    if (comment) {
      setValue('comment', comment.comment)
    }
  }, [])

  const closeField = useCallback(() => {
    setShowField(false)
  }, [])

  const fieldBackgroundColor = useIsTheme('system-jetblack', 'system-grey')
  const buttonBackgroundColor = useIsTheme(
    'system-contrast',
    'social-instagram'
  )
  const buttonTextColor = useIsTheme('system-jetblack', 'status-contrast')

  return (
    <S.FieldBackground>
      <Field
        type="textarea"
        control={control}
        name="comment"
        placeholder={t('addYourComment')}
        backgroundColor={fieldBackgroundColor}
      />
      <S.ButtonsContainer>
        <Button
          label={isEdit ? t('update') : t('send')}
          className="post-comment-button"
          loaderColor={buttonTextColor}
          disabled={
            !watchCommment || (isEdit && watchCommment === comment.comment)
          }
          loading={loading || creating || editing}
          upperCase
          backgroundColor={buttonBackgroundColor}
          textColor={buttonTextColor}
          onClick={handleSubmit(handleClick)}
        />
        <ShouldRender if={isEdit}>
          <Button
            label={t('cancel')}
            className="post-comment-button"
            loaderColor={buttonTextColor}
            loading={editing}
            upperCase
            backgroundColor={buttonBackgroundColor}
            textColor={buttonTextColor}
            onClick={closeField}
          />
        </ShouldRender>
      </S.ButtonsContainer>
    </S.FieldBackground>
  )
}

export default CommentField
