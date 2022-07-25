import styled from 'styled-components'

export const EditContainer = styled.div`
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .edit-post-body {
    height: 250px;
  }

  @media (max-width: 425px) {
    padding: 40px 20px;
  }
`

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`
