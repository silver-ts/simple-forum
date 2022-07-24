import styled from 'styled-components'

export const ShareContainer = styled.div`
  width: 100%;
  flex-wrap: wrap;
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 425px) {
    gap: 5px;
  }

  button {
    transition: all 0.2s ease-in-out;

    &:hover {
      filter: opacity(0.8);
    }
  }
`
