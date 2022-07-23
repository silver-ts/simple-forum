import { useMutation } from '@apollo/client'
import { Button } from '@components/Button'
import { Field } from '@components/Field'
import { ADD_COMMENT } from '@constants/mutations'
import { GET_COMMENTS_BY_ID } from '@constants/queries'
import { dark } from '@styles/theme'
import useIsAuthenticated from '@utils/useIsAuthenticated'
import { FC, useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useTheme } from 'styled-components'

import * as S from './styles'

type Props = {
  loading: boolean
}

const CommentField: FC<Props> = ({ loading }) => {
  const { t } = useTranslation()

  const { id: postId } = useParams()

  const theme = useTheme()

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

  return (
    <S.FieldBackground>
      <Field
        type="textarea"
        control={control}
        name="comment"
        placeholder={t('addYourComment')}
        backgroundColor={theme === dark ? 'system-jetblack' : 'system-grey'}
      />
      <Button
        label={t('send')}
        loaderColor={theme === dark ? 'system-jetblack' : 'status-contrast'}
        disabled={!watchCommment}
        loading={loading || creating}
        upperCase
        backgroundColor={
          theme === dark ? 'system-contrast' : 'social-instagram'
        }
        textColor={theme === dark ? 'system-jetblack' : 'status-contrast'}
        onClick={handleSubmit(handleClick)}
      />
    </S.FieldBackground>
  )
}

export default CommentField
