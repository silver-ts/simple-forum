import styled from 'styled-components'
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'

export const Container = styled.div<{ isCheck?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`
export const PasswordFieldContainer = styled.div`
  position: relative;
  width: 100%;
`

const getIcon = (Icon) =>
  styled(Icon).attrs(({ theme }) => ({
    size: 28,
    color: theme.colors.system.contrast
  }))`
    position: absolute;
    right: 13px;
    bottom: 23px;
    cursor: pointer;
  `

export const PasswordVisibleIcon = getIcon(IoEyeOutline)
export const PasswordHiddenIcon = getIcon(IoEyeOffOutline)
