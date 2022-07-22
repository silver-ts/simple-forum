import styled from 'styled-components'

export const Button = styled.button<{
  backgroundColor: string
  transparent?: boolean
  full?: boolean
  rounded?: boolean
}>`
  height: 44px;
  width: ${({ full }) => (full ? '100%' : '375px')};
  background: ${({ backgroundColor, transparent }) =>
    transparent ? 'transparent' : backgroundColor};
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
  position: relative;

  ${({ rounded }) => rounded && 'border-radius: 50%;'}

  transition: all 0.2s ease-in-out;

  &:disabled {
    opacity: 0.5;
  }

  &:hover:not([disabled]) {
    opacity: 0.8;
  }
`
