import styled from 'styled-components'
import { MdModeNight } from 'react-icons/md'

export const Container = styled.header`
  width: 100vw;
  background: ${({ theme }) => theme.colors.system.secondary};
`

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1800px;
  margin-left: auto;
  margin-right: auto;
  padding: 10px 20px;
`

export const SettingsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
`

export const DarkModeIcon = styled(MdModeNight).attrs({
  size: 20,
  color: '#fff'
})``
