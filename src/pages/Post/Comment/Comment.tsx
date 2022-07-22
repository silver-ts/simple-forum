import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Text } from '@components/Text'
import useFormattedDistanceToNow from '@utils/useFormattedDistanceToNow'
import ShouldRender from '@components/ShouldRender'
import { Comment as CommentType } from '@constants/types'

import * as S from './styles'

type Props = {
  comment?: CommentType
  loading: boolean
}

const Comment: FC<Props> = ({ comment, loading }) => {
  const { t } = useTranslation()

  return (
    <S.Comment>
      <S.CommentInfo>
        <Text type="super-big-label" loading={loading} shimmerWidth="300px">
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
    </S.Comment>
  )
}

export default Comment
