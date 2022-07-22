import { ClipLoader, BeatLoader } from 'react-spinners'
import useResolveColor from '@utils/useResolveColor'
import { Styles } from '@styles/Theme'
import { HTMLAttributes } from 'react'
import ShouldRender from '../ShouldRender'
import { Text } from '../Text'

import * as S from './styles'

export type Props = HTMLAttributes<HTMLButtonElement> & {
  label?: string
  backgroundColor?: Styles.Colors
  textColor?: Styles.Colors
  transparent?: boolean
  onClick?: () => void
  style?: React.CSSProperties
  className?: string
  children?: React.ReactNode
  loader?: 'beat' | 'clip'
  width?: React.CSSProperties['width']
  height?: React.CSSProperties['height']
  rounded?: boolean
  upperCase?: boolean
  full?: boolean
  loading?: boolean
  disabled?: boolean
  restricted?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const Button: React.FC<Props> = ({
  label,
  backgroundColor = 'system-primary',
  textColor = 'system-contrast',
  transparent,
  style,
  className,
  children,
  upperCase,
  full,
  onClick,
  disabled,
  loading,
  width,
  height,
  rounded,
  loader = 'beat',
  type = 'button',
  ...props
}: Props) => {
  const resolveColor = useResolveColor()

  const isVisibleChildren = !!children && !loading
  const isVisibleText = !!label && !loading && !children

  const background = resolveColor(backgroundColor)

  return (
    <S.Button
      type={type}
      backgroundColor={background}
      transparent={transparent}
      onClick={onClick}
      rounded={rounded}
      style={{ width, height, ...(style || {}) }}
      className={className}
      full={full}
      disabled={loading || disabled}
      {...props}
    >
      <ShouldRender if={loading}>
        <ShouldRender if={loader === 'beat'}>
          <BeatLoader
            size={8}
            color={resolveColor('system-contrast')}
            loading
          />
        </ShouldRender>
        <ShouldRender if={loader === 'clip'}>
          <ClipLoader
            size={20}
            color={resolveColor('system-contrast')}
            loading
          />
        </ShouldRender>
      </ShouldRender>
      <ShouldRender if={isVisibleChildren}>{children}</ShouldRender>
      <ShouldRender if={isVisibleText}>
        <Text
          color={textColor}
          size="20px"
          font="cairo-bold"
          weight={700}
          upperCase={upperCase}
        >
          {label}
        </Text>
      </ShouldRender>
    </S.Button>
  )
}

export default Button
