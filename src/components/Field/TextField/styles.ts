import styled from 'styled-components'

export const Input = styled.input<{ backgroundColor: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  border: none;
  color: ${({ theme }) => theme.colors.system.contrast};
  box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px,
    rgba(17, 17, 26, 0.1) 0px 0px 8px;
  height: 44px;
  margin-top: 8px;
  width: 100%;
  margin-bottom: 15px;
  padding-left: 5px;
  font-size: 15px;
  padding: 0 20px;
  font-family: 'Roboto';
`
