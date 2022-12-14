import styled from 'styled-components'

export const FieldBackground = styled.div`
  margin-top: 10px;
  width: 100%;
  background: ${({ theme }) => theme.colors.system.tertiary};
  box-shadow: rgba(0, 0, 0, 0.24) 0px 0px 4px;
  display: flex;
  flex-direction: column;
  padding: 10px;

  .post-comment-button {
    @media (max-width: 475px) {
      width: 100%;
    }
  }
`

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 15px;
`
