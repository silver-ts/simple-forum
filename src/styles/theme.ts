import { DefaultTheme } from 'styled-components'

const defineFont = (family: string, size: string, weight: number) => ({
  family,
  size,
  weight
})

const fonts = {
  'big-title': defineFont('Roboto Condensed', '3.25rem', 600),
  'medium-title': defineFont('cairo-medium', '2.188rem', 600),
  'regular-title': defineFont('cairo-medium', '1.75rem', 600),
  'small-title': defineFont('cairo-medium', '1.188rem', 600),
  'super-small-title': defineFont('cairo-medium', '0.875rem', 600),
  'super-big-label': defineFont('Roboto Condensed', '1.375rem', 600),
  'big-label': defineFont('Roboto Condensed', '1.188rem', 500),
  'medium-label': defineFont('Roboto', '0.938rem', 500),
  'small-label': defineFont('Roboto', '0.875rem', 500),
  'super-small-label': defineFont('Roboto', '0.75rem', 500)
}

const status = {
  success: '#006411',
  warning: '#EBC000',
  danger: '#D50000',
  info: '#06ADE0',
  contrast: '#FFFFFF'
}

const social = {
  google: '#DB4A38',
  facebook: '#3B5999',
  instagram: '#C13584',
  linkedin: '#2867B2',
  twitter: '#1DA1F2'
}

export const light: DefaultTheme = {
  colors: {
    system: {
      primary: '#3331',
      secondary: '#CDCDCD',
      tertiary: '#e3e3e3',
      contrast: '#000000ee',
      greydark: '#424242',
      greylight: '#8E8E8E',
      grey: '#CDCDCD',
      jetblack: '#242526'
    },
    status,
    social
  },
  fonts
}

export const dark: DefaultTheme = {
  colors: {
    system: {
      primary: '#111',
      secondary: '#1D1D1D',
      tertiary: '#343434',
      contrast: '#FFFFFF',
      greydark: '#424242',
      greylight: '#8E8E8E',
      grey: '#CDCDCD',
      jetblack: '#242526'
    },
    status,
    social
  },
  fonts
}
