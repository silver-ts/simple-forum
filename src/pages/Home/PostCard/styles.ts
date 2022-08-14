import styled from 'styled-components'

export const PostCard = styled.div`
  width: clamp(300px, 75%, 1400px);
  height: clamp(300px, 75%, 1400px);
  background: ${({ theme }) => theme.colors.system.tertiary};
  padding: 20px 30px;
  cursor: pointer;
  transition: 300ms;

  ${({ theme }) =>
    theme.name === 'light' &&
    `
      box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  `}

  @media (max-width: 415px) {
    box-shadow: rgba(17, 17, 26, 0.2) 0px 1px 0px,
      rgba(17, 17, 26, 0.3) 0px 0px 8px;
  }

  :hover {
    transform: scale(1.05);
  }
`

export const PostHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 495px) {
    h2 {
      font-size: 1.75rem;
    }
  }
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
