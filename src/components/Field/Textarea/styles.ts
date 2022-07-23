import { Text } from '@components/Text'
import styled from 'styled-components'

export const Container = styled.div.attrs({
  className: 'textArea__container'
})<{
  backgroundColor: string
}>`
  display: flex;
  flex: 1;
  height: auto;
  width: 100%;
  background-color: ${({ backgroundColor }) => backgroundColor};
  padding: 15px 20px 10px 20px;
  flex-direction: column;
  margin-top: 8px;
  margin-bottom: 15px;
`

export const TextArea = styled.textarea`
  min-height: 80px;
  width: 100%;
  resize: none;
  border: none;
  background-color: transparent;
  font-size: 16px;
  font-family: 'Roboto';
  color: ${({ theme }) => theme.colors.system.contrast};

  :focus {
    border: none;
    outline: none;
  }
`

export const CharactersLeftContainer = styled.div`
  bottom: 0;
  right: 10px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-top: 15px;
  font-family: 'Roboto';
`

export const CharactersLeft = styled(Text).attrs({
  size: '15px',
  color: 'system-grey'
})``
