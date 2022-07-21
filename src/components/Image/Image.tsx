import React, { useCallback, useMemo, useState } from 'react'
import Default from '@assets/images/cover-default.png'
import ShouldRender from '@components/ShouldRender'
import Shimmer from '@components/Shimmer'
import * as S from './styles'

export type Props = {
  loading?: boolean
  objectFit?: React.CSSProperties['objectFit']
  width: React.CSSProperties['width']
  height: React.CSSProperties['height']
  radius?: React.CSSProperties['borderRadius']
  src?: string
  srcSet?: string
  alt?: string
  style?: React.CSSProperties
  className?: string
  rounded?: boolean
  onClick?: () => void
}

const Image: React.FC<Props> = (props) => {
  const {
    loading,
    objectFit = 'cover',
    width,
    height,
    radius,
    src,
    rounded,
    className,
    ...rest
  } = props

  const [hasError, setHasError] = useState(false)

  const handleError = useCallback(() => {
    setHasError(true)
  }, [src])

  const currentSrc = useMemo(() => {
    if (hasError || !src) {
      return Default
    }

    return src
  }, [src, hasError])

  return (
    <>
      <ShouldRender if={!loading}>
        <S.Image
          {...rest}
          src={currentSrc}
          objectFit={objectFit}
          width={width}
          height={height}
          radius={radius}
          rounded={rounded}
          onError={handleError}
          className={className}
        />
      </ShouldRender>
      <ShouldRender if={loading}>
        <Shimmer
          className={className}
          style={{
            width,
            height,
            borderRadius: rounded ? '50%' : radius,
            ...(rest.style || {})
          }}
        />
      </ShouldRender>
    </>
  )
}

export default Image
