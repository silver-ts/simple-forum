import styled from 'styled-components'

type ButtonProps = {
  isActive: boolean
}

export const Container = styled.div`
  position: fixed;
  z-index: 4;
  right: 15px;
  bottom: 10px;
  background: ${({ theme }) => theme.colors.system.tertiary};
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90px;
  height: 50px;
  padding: 10px;

  .active {
    border: 2px solid #000 !important;
    transform: scale(1.2) !important;
  }
`

export const Button = styled.button<ButtonProps>`
  width: 30px;
  height: 30px;
  border: none;
  transition: transform 0.2s ease 0s;

  ${({ isActive }) =>
    isActive &&
    `
  border: 2px solid #000 !important;
  transform: scale(1.2) !important;`}

  &:hover {
    transform: scale(1.1);
  }
`
