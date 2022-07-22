import styled from 'styled-components'
import { Image } from '@components/Image'
import { MdDarkMode } from 'react-icons/md'
import { HiSun } from 'react-icons/hi'

export const Container = styled.header`
  background: ${({ theme }) => theme.colors.system.secondary};
`

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1800px;
  margin-left: auto;
  margin-right: auto;
  padding: 15px 20px;
`

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  img {
    filter: invert(32%) sepia(98%) saturate(950%) hue-rotate(289deg)
      brightness(81%) contrast(97%);
  }
`

export const Logo = styled(Image).attrs({
  width: 40,
  height: 40
})``

export const SettingsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`

export const Avatar = styled(Image).attrs({
  width: 55,
  height: 55,
  alt: 'User Image'
})`
  cursor: pointer;
`

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
