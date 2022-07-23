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
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  padding: 20px 0;

  @media (max-width: 415px) {
    background: transparent;
    box-shadow: none;
  }
`

export const TitleContainer = styled.div`
  width: clamp(300px, 75%, 1400px);
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
