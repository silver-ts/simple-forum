import { Text } from '@components/Text'
import authStore from '@state/auth/auth'
import { FC } from 'react'

import * as S from './styles'

type Props = {
  onClick: () => void
}

const Avatar: FC<Props> = ({ onClick }) => {
  const { user } = authStore()

  const avatarText = user.displayName.substring(0, 2)

  return (
    <S.Avatar onClick={onClick}>
      <Text color="status-contrast" type="super-big-label" weight={400}>
        {avatarText}
      </Text>
    </S.Avatar>
  )
}

export default Avatar
