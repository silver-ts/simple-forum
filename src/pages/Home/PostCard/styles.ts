import styled from 'styled-components'

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
