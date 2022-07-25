import { Dispatch, FC, SetStateAction, useCallback, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { useTranslation } from 'react-i18next'
import { Button } from '@components/Button'
import { Field } from '@components/Field'
import { UPDATE_POST_BY_ID } from '@constants/mutations'
import { GET_POST_BY_ID } from '@constants/queries'
import { Post } from '@constants/types'
import useIsTheme from '@utils/useIsTheme'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import * as S from './styles'

type Props = {
  post: Post
  setIsEditing: Dispatch<SetStateAction<boolean>>
}

const EditPost: FC<Props> = ({ post, setIsEditing }) => {
  const { t } = useTranslation()
  const { id: postId } = useParams()

  const [updatePost, { loading, error: updatePostError }] = useMutation(
    UPDATE_POST_BY_ID,
    {
      optimisticResponse: true,
      refetchQueries: [GET_POST_BY_ID]
    }
  )

  const { control, handleSubmit, setValue, watch } = useForm()
  const watchTitle = watch('title', '')
  const watchBody = watch('body', '')

  const handleClick = useCallback((payload) => {
    updatePost({
      variables: {
        id: postId,
        title: payload.title,
        body: payload.body
      }
    }).then(() => {
      setIsEditing(false)
      setValue('title', '')
      setValue('body', '')
    })
  }, [])

  const closeForm = useCallback(() => {
    setIsEditing(false)
  }, [])

  useEffect(() => {
    if (post) {
      setValue('title', post?.title)
      setValue('body', post?.body)
    }
  }, [])

  useEffect(() => {
    if (updatePostError) {
      toast.error(updatePostError?.message)
    }
  }, [updatePostError])

  const fieldBackgroundColor = useIsTheme('system-jetblack', 'system-grey')

  const buttonBackgroundColor = useIsTheme(
    'system-contrast',
    'social-instagram'
  )
  const buttonTextColor = useIsTheme('system-jetblack', 'status-contrast')

  return (
    <S.EditContainer>
      <Field name="title" control={control} />
      <Field
        type="textarea"
        name="body"
        className="edit-post-body"
        control={control}
        backgroundColor={fieldBackgroundColor}
        style={{ resize: 'vertical' }}
      />
      <S.ButtonsContainer>
        <Button
          label={t('update')}
          upperCase
          disabled={
            loading ||
            !watchBody ||
            !watchTitle ||
            (watchTitle === post?.title && watchBody === post?.body)
          }
          loading={loading}
          backgroundColor={buttonBackgroundColor}
          textColor={buttonTextColor}
          loaderColor={buttonTextColor}
          type="submit"
          onClick={handleSubmit(handleClick)}
        />
        <Button
          label={t('cancel')}
          upperCase
          disabled={loading}
          backgroundColor={buttonBackgroundColor}
          textColor={buttonTextColor}
          loaderColor={buttonTextColor}
          loading={loading}
          onClick={closeForm}
        />
      </S.ButtonsContainer>
    </S.EditContainer>
  )
}

export default EditPost
