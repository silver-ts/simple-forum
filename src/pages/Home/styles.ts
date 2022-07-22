import styled from 'styled-components'

export const Container = styled.div`
  padding: 40px;
`

export const Content = styled.div`
  width: 100%;
  max-width: 1800px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.system.secondary};
  padding: 20px 0;
`
