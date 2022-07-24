import { FC } from 'react'
import { Text } from '@components/Text'
import { Post } from '@constants/types'
import { useTranslation, Trans } from 'react-i18next'
import ShouldRender from '@components/ShouldRender'
import authStore from '@state/auth/auth'
import useFormattedDistanceToNow from '@utils/useFormattedDistanceToNow'

import * as S from './styles'

type Props = {
  post?: Post
  loading: boolean
  onClick?: () => void
}

const PostCard: FC<Props> = ({ post, loading, onClick }) => {
  const { t } = useTranslation()

  const { user } = authStore()

  return (
    <S.PostCard key={post?.id} onClick={onClick}>
      <S.PostHeader>
        <Text
          tag="h2"
          loading={loading}
          shimmerWidth="55%"
          type="medium-title"
          style={{ lineHeight: 1.1 }}
        >
          {post?.title}
        </Text>
        <S.UserAndDateContainer>
          <Text
            loading={loading}
            style={{ maxWidth: '230px' }}
            ellipsis
            type="big-label"
          >
            <Trans
              t={t}
              i18nKey="by"
              values={{ author: post?.author?.displayName }}
              components={[
                <Text
                  tag="span"
                  type="big-label"
                  weight={600}
                  color={
                    post?.author?.id === user.id
                      ? 'social-instagram'
                      : 'system-contrast'
                  }
                />
              ]}
            />
          </Text>
          <Text loading={loading} shimmerWidth={100} type="big-label">
            {useFormattedDistanceToNow(Number(post?.createdAt))}
          </Text>
        </S.UserAndDateContainer>
        <ShouldRender if={post?.updatedAt !== post?.createdAt}>
          <Text loading={loading} type="big-label">
            {t('updatedAt', {
              time: useFormattedDistanceToNow(Number(post?.updatedAt))
            })}
          </Text>
        </ShouldRender>
      </S.PostHeader>
      <S.PostBodyContainer>
        <Text
          loading={loading}
          shimmerWidth="100%"
          shimmerLines={3}
          type="big-label"
          ellipsis
          numberOfLines={3}
          align="justify"
          style={{ lineHeight: 1.2 }}
        >
          {post?.body}
        </Text>
      </S.PostBodyContainer>
    </S.PostCard>
  )
}

export default PostCard
