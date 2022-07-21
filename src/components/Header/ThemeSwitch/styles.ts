import styled from 'styled-components'
import { MdDarkMode } from 'react-icons/md'
import { HiSun } from 'react-icons/hi'

export const DarkModeIcon = styled(MdDarkMode).attrs({
  size: '100%',
  color: '#1D1D1D'
})``

export const LightModeIcon = styled(HiSun).attrs({
  size: '80%',
  color: '#C13584'
})``

export const LightModeIconContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
