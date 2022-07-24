import { useMutation } from '@apollo/client'
import { Button } from '@components/Button'
import { Field } from '@components/Field'
import { ADD_COMMENT } from '@constants/mutations'
import { GET_COMMENTS_BY_ID } from '@constants/queries'
import useIsAuthenticated from '@utils/useIsAuthenticated'
import useIsTheme from '@utils/useIsTheme'
import { FC, useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import * as S from './styles'

type Props = {
  loading: boolean
}

const CommentField: FC<Props> = ({ loading }) => {
  const { t } = useTranslation()

  const { id: postId } = useParams()

  const [isAuthenticated] = useIsAuthenticated()

  const [createComment, { loading: creating, error: createCommentError }] =
    useMutation(ADD_COMMENT, {
      optimisticResponse: true,
      refetchQueries: [GET_COMMENTS_BY_ID]
    })

  const { control, handleSubmit, setValue, watch } = useForm()
  const watchCommment = watch('comment', '')

  const handleClick = useCallback((payload) => {
    if (isAuthenticated) {
      createComment({
        variables: {
          postId,
          comment: payload.comment
        }
      }).then(() => {
        setValue('comment', '')
      })
    }

    if (!isAuthenticated) {
      toast.info(t('loginToComment'))
    }
  }, [])

  useEffect(() => {
    if (createCommentError) {
      toast.error(createCommentError?.message)
    }
  }, [createCommentError])

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
      <Button
        label={t('send')}
        className="post-comment-button"
        loaderColor={buttonTextColor}
        disabled={!watchCommment}
        loading={loading || creating}
        upperCase
        backgroundColor={buttonBackgroundColor}
        textColor={buttonTextColor}
        onClick={handleSubmit(handleClick)}
      />
    </S.FieldBackground>
  )
}

export default CommentField
