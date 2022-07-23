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
  box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px,
    rgba(17, 17, 26, 0.1) 0px 0px 8px;
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
