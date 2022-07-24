import styled from 'styled-components'

export const Container = styled.div`
  max-width: 1800px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Content = styled.div`
  width: clamp(270px, 100%, 1000px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`
