import styled from 'styled-components'

export const Container = styled.div`
  padding-top: 40px;
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

export const PostCard = styled.div`
  width: clamp(300px, 75%, 1400px);
  height: clamp(300px, 75%, 1400px);
  background: ${({ theme }) => theme.colors.system.tertiary};
  padding: 20px 30px;
  cursor: pointer;
  transition: 300ms;

  :hover {
    transform: scale(1.05);
  }
`

export const PostHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const UserAndDateContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`

export const PostBodyContainer = styled.div`
  width: 100%;
  padding: 20px 0;
`
