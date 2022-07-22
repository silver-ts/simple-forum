import styled from 'styled-components'

export const Input = styled.input<{ backgroundColor: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  border: none;
  border-radius: 5px;
  color: ${({ theme }) => theme.colors.system.contrast};
  height: 44px;
  margin-top: 8px;
  width: 100%;
  margin-bottom: 15px;
  padding-left: 5px;
  font-size: 15px;
  padding: 0 20px;
  font-family: 'Roboto';
`
