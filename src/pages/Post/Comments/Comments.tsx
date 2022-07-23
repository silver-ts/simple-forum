import ShouldRender from '@components/ShouldRender'
import { Text } from '@components/Text'
import { Comment as CommentType, User } from '@constants/types'
import { dark } from '@styles/theme'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'styled-components'
import { Comment } from '../Comment'

type Props = {
  loading: boolean
  comments: CommentType[]
  user?: User
}

const Comments: FC<Props> = (props) => {
  const { t } = useTranslation()

  const { loading, comments, user } = props

  const theme = useTheme()

  return (
    <>
      <Text
        style={{ marginTop: '20px' }}
        type="medium-title"
        color={theme === dark ? 'system-contrast' : 'social-instagram'}
      >
        {t('comments')}
      </Text>
      <ShouldRender if={!loading}>
        {comments?.map((comment) => (
          <Comment
            key={comment?.user?.id}
            loading={loading}
            comment={comment}
            isAuthor={comment?.user?.id === user?.id}
          />
        ))}
      </ShouldRender>
      <ShouldRender if={loading}>
        {Array.from([0, 1, 2, 3, 4]).map(() => (
          <Comment loading />
        ))}
      </ShouldRender>
    </>
  )
}

export default Comments
