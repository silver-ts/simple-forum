import { FC, useCallback, useEffect, useMemo } from 'react'
import { format } from 'date-fns'
import { useTranslation, Trans } from 'react-i18next'
import useFormattedDistanceToNow from '@utils/useFormattedDistanceToNow'
import authStore from '@state/auth/auth'
import ShouldRender from '@components/ShouldRender'
import useIsAuthenticated from '@utils/useIsAuthenticated'
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

  const [isAuthenticated] = useIsAuthenticated()

  const [deletePost, { loading: deleting, error: deleteError }] =
    useMutation(DELETE_POST_BY_ID)

  const theme = useTheme()

  const { id } = useParams()

  const { user } = authStore()

  const loading = deleting || postLoading

  const navigate = useNavigate()

  const handleClickDelete = useCallback(() => {
    deletePost({
      variables: {
        postId: id
      }
    }).then(() => navigate('/'))
  }, [])

  const reportDate = useMemo(
    () => format(new Date(), 'HH:mm dd/MM/yyyy'),
    [post]
  )

  const handleClickReport = useCallback(() => {
    // eslint-disable-next-line no-unused-expressions
    window.open(
      `mailto:leojuriolli3@gmail.com?subject=Reporting%20post%20on%20Cluster&body=Post%20id:%20${post?.id}%20%0D%0APost%20title:%20${post?.title}%0D%0APost%20by:%20${post?.author?.displayName}%20(${post?.author?.username})%0D%0AReported%20by:%20${user?.displayName}%20(${user?.username})%0D%0ADate%20reported:%20${reportDate}%0D%0A(Add%20more%20info%20here)`
    ) ||
      window.location.replace(
        `mailto:leojuriolli3@gmail.com?subject=Reporting%20post%20on%20Cluster&body=Post%20id:%20${post?.id}%20%0D%0APost%20title:%20${post?.title}%0D%0ADate%20reported:%20${reportDate}%0D%0A(Add%20more%20info%20here)`
      )
  }, [post])

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
          style={{ lineHeight: 1.2, whiteSpace: 'pre-wrap' }}
        >
          {post?.body}
        </Text>
      </S.PostBodyContainer>

      <ShareButtons disabled={loading} postTitle={post?.title} />

      <S.ButtonsContainer>
        <ShouldRender if={isAuthor && !postLoading}>
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
        </ShouldRender>

        <ShouldRender if={!postLoading && !isAuthor && isAuthenticated}>
          <Button
            backgroundColor="social-instagram"
            width="70px"
            loading={loading}
            onClick={handleClickReport}
          >
            <S.ButtonContent>
              <S.ReportIcon />
            </S.ButtonContent>
          </Button>
        </ShouldRender>
      </S.ButtonsContainer>
    </S.PostText>
  )
}

export default PostContent
