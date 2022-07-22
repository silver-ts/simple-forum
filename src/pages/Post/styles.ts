import styled from 'styled-components'

export const Container = styled.div`
  padding: 40px;
`

export const Content = styled.div`
  width: 100%;
  max-width: 1800px;
  margin-left: auto;
  margin-right: auto;
  background: ${({ theme }) => theme.colors.system.tertiary};
  padding: 20px 0;
`

export const PostText = styled.div`
  margin: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const PostHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

export const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const PostDates = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`

export const PostBodyContainer = styled.div`
  width: 100%;
  padding: 20px 0;
`