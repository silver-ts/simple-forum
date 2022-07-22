import styled from 'styled-components'
import { Text } from '@components/Text'

export const Container = styled.footer`
  background: ${({ theme }) => theme.colors.system.secondary};
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
})`
  &:hover {
    filter: opacity(0.8);
  }
`
