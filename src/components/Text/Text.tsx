import Shimmer from '@components/Shimmer'
import ShouldRender from '@components/ShouldRender'
import { Styles } from '@styles/Theme'
import useResolveColor from '@utils/useResolveColor'
import { useMemo } from 'react'
import { useTheme } from 'styled-components'
import * as S from './styles'

const availableFonts = [
  'montserrat-regular',
  'montserrat-bold',
  'montserrat-light',
  'montserrat-medium',
  'roboto',
  'roboto condensed'
] as const

type Font = typeof availableFonts[number]

const availableTags = [
  'p',
  'strong',
  'span',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'label',
  'a'
] as const

type Tag = typeof availableTags[number]

export type TextProps = {
  type?: Styles.Fonts
  color?: Styles.Colors
  size?: React.CSSProperties['fontSize']
  font?: Font
  align?: 'left' | 'center' | 'right'
  italic?: boolean
  upperCase?: boolean
  loading?: boolean
  shimmerWidth?: React.CSSProperties['width']
  shimmerHeight?: React.CSSProperties['height']
  style?: React.CSSProperties
  children?: React.ReactNode
  weight?: number
  ellipsis?: boolean
  numberOfLines?: number
  isRandomWidth?: boolean
  shimmerLines?: number
  lowerCase?: boolean
  capitalize?: boolean
  tag?: Tag
  underline?: boolean
  href?: string
  onClick?: () => void
  className?: string
  htmlFor?: string
  hyphens?: boolean
}

const Text: React.FC<TextProps> = ({
  type,
  size,
  italic,
  upperCase,
  loading,
  children,
  weight,
  ellipsis,
  isRandomWidth,
  style,
  lowerCase,
  shimmerHeight,
  capitalize,
  underline,
  onClick,
  className,
  hyphens,
  color = 'system-contrast',
  font = 'roboto',
  shimmerWidth = 40,
  shimmerLines = 1,
  numberOfLines = 1,
  tag = 'p',
  align = 'left',
  ...props
}: TextProps) => {
  const theme = useTheme()
  const resolve = useResolveColor()

  const typeProps = useMemo(() => {
    if (!type) {
      return {}
    }

    const fontType = theme.fonts[type]

    return {
      font: fontType.family as Font,
      weight: weight ?? fontType.weight,
      size: fontType.size
    }
  }, [theme.fonts, type, weight])

  const customChildren = useMemo(
    () => (loading ? '' : children),
    [children, loading]
  )

  const randomWidth = useMemo(() => {
    const output = Math.random() * 150

    return output < shimmerWidth ? shimmerWidth : output
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <ShouldRender if={!loading}>
        <S.Text
          {...props}
          as={tag}
          textColor={resolve(color)}
          size={size}
          font={font}
          align={align}
          italic={italic}
          upperCase={upperCase}
          underline={underline}
          weight={weight}
          style={style}
          ellipsis={ellipsis}
          numberOfLines={numberOfLines}
          lowerCase={lowerCase}
          capitalize={capitalize}
          tag={tag}
          onClick={onClick}
          className={className}
          hyphens={hyphens}
          {...typeProps}
        >
          {customChildren}
        </S.Text>
      </ShouldRender>
      <ShouldRender if={loading}>
        {Array.from({ length: shimmerLines }, (_, key) => (
          <Shimmer
            key={key}
            style={{
              ...style,
              height: shimmerHeight || size || typeProps.size,
              width: isRandomWidth ? randomWidth : shimmerWidth,
              marginTop: key === 0 ? style?.marginTop : 10
            }}
          />
        ))}
      </ShouldRender>
    </>
  )
}

export default Text
