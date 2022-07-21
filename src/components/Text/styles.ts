import styled, { css } from 'styled-components'
import { TextProps } from './Text'

export const Text = styled.div<TextProps & { textColor: string }>`
  font-size: ${({ size }) => `${size}`};
  line-height: ${({ size }) => `${size}`};
  color: ${({ textColor, theme }) => textColor || theme.colors.system.contrast};
  font-family: ${({ font }) => font};
  text-align: ${({ align }) => align || 'center'};

  ${({ weight }) => weight && `font-weight: ${weight}`};
  ${({ font }) => font === 'montserrat-bold' && 'font-weight: bold;'}
  ${({ italic }) => italic && 'font-style: italic;'}
  ${({ upperCase }) => upperCase && 'text-transform: uppercase;'};
  ${({ lowerCase }) => lowerCase && 'text-transform: lowercase;'};
  ${({ capitalize }) => capitalize && 'text-transform: capitalize;'};
  ${({ underline }) => underline && 'text-decoration: underline;'};
  ${({ hyphens }) => hyphens && 'hyphens: auto;'};
  ${({ ellipsis, numberOfLines = 1 }) =>
    ellipsis &&
    css`
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: ${numberOfLines};
      -webkit-box-orient: vertical;
    `};
  ${({ onClick }) => onClick && 'cursor: pointer;'};
`
