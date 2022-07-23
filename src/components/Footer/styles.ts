import styled from 'styled-components'
import { Text } from '@components/Text'

export const Container = styled.footer`
  background: ${({ theme }) => theme.colors.system.secondary};
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 1800px;
  margin-left: auto;
  margin-right: auto;
  padding: 25px 20px;
`

export const Link = styled(Text).attrs({
  type: 'small-title',
  tag: 'a'
})``
