import styled from 'styled-components'

export const Comment = styled.div`
  background: ${({ theme }) => theme.colors.system.tertiary};
  padding: 20px;
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  max-width: 1800px;
  gap: 20px;
  margin-top: 20px;
`

export const CommentInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const CommentText = styled.div`
  width: 100%;
`
