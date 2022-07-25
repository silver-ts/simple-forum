import { FC, useCallback, useEffect } from 'react'
import { useTranslation, Trans } from 'react-i18next'
import useFormattedDistanceToNow from '@utils/useFormattedDistanceToNow'
import ShouldRender from '@components/ShouldRender'
import { useTheme } from 'styled-components'
import { Post } from '@constants/types'
import { Button } from '@components/Button'
import { Text } from '@components/Text'
import { useMutation } from '@apollo/client'
import { DELETE_POST_BY_ID } from '@constants/mutations'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { ShareButtons } from './ShareButtons'
import * as S from './styles'

type Props = {
  post?: Post
  loading: boolean
  isAuthor: boolean
  onClickEdit: () => void
}

const PostContent: FC<Props> = ({
  post,
  loading: postLoading,
  isAuthor,
  onClickEdit
}) => {
  const { t } = useTranslation()

  const [deletePost, { loading: deleting, error: deleteError }] =
    useMutation(DELETE_POST_BY_ID)

  const theme = useTheme()

  const { id } = useParams()

  const loading = deleting || postLoading

  const navigate = useNavigate()

  const handleClickDelete = useCallback(() => {
    deletePost({
      variables: {
        postId: id
      }
    }).then(() => navigate('/'))
  }, [])

  useEffect(() => {
    if (deleteError) {
      toast.error(deleteError?.message)
    }
  }, [deleteError])

  return (
    <S.PostText>
      <S.PostInfo>
        <Text
          tag="h1"
          loading={loading}
          shimmerWidth="clamp(250px, 50%, 550px)"
          type="big-title"
          style={{ lineHeight: 1.1 }}
        >
          {post?.title}
        </Text>
        <S.PostDates>
          <Text
            loading={loading}
            type="medium-label"
            shimmerWidth={100}
            style={{ paddingRight: '5px' }}
          >
            {t('postedAt', {
              time: useFormattedDistanceToNow(Number(post?.createdAt))
            })}
          </Text>
          <ShouldRender if={post?.updatedAt !== post?.createdAt}>
            <Text
              loading={loading}
              type="medium-label"
              shimmerWidth={100}
              style={{
                paddingLeft: '5px',
                borderLeft: `1px solid ${theme.colors.system.contrast}`
              }}
            >
              {t('updatedAt', {
                time: useFormattedDistanceToNow(Number(post?.updatedAt))
              })}
            </Text>
          </ShouldRender>
        </S.PostDates>
        <Text
          loading={loading}
          ellipsis
          type="super-big-label"
          weight={400}
          shimmerWidth={150}
        >
          <Trans
            t={t}
            i18nKey="by"
            values={{ author: post?.author?.displayName }}
            components={[
              <Text
                loading={loading}
                type="super-big-label"
                tag="span"
                weight={600}
                color={isAuthor ? 'social-instagram' : 'system-contrast'}
              />
            ]}
          />
        </Text>
      </S.PostInfo>
      <S.PostBodyContainer>
        <Text
          loading={loading}
          shimmerWidth="100%"
          shimmerLines={3}
          type="big-label"
          align="justify"
          style={{ lineHeight: 1.2 }}
        >
          {post?.body}
        </Text>
      </S.PostBodyContainer>

      <ShareButtons disabled={loading} postTitle={post?.title} />

      <ShouldRender if={isAuthor}>
        <S.ButtonsContainer>
          <Button
            backgroundColor="social-instagram"
            width="70px"
            onClick={handleClickDelete}
            loading={loading}
          >
            <S.ButtonContent>
              <S.DeleteIcon />
            </S.ButtonContent>
          </Button>
          <Button
            backgroundColor="social-instagram"
            width="70px"
            onClick={onClickEdit}
            loading={loading}
          >
            <S.ButtonContent>
              <S.EditIcon />
            </S.ButtonContent>
          </Button>
        </S.ButtonsContainer>
      </ShouldRender>
    </S.PostText>
  )
}

export default PostContent
