import styled from 'styled-components'
import { Props } from './Image'

export const Image = styled.img<Props>`
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  height: ${({ height }) =>
    typeof height === 'number' ? `${height}px` : height};
  object-fit: ${({ objectFit }) => objectFit};
  ${({ rounded }) => rounded && 'border-radius: 50%'};
  ${({ radius }) =>
    radius &&
    `border-radius: ${typeof radius === 'number' ? `${radius}px` : radius}`};
`
