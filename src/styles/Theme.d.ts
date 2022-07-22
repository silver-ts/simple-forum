import {} from 'styled-components'

type Shades = Record<'primary' | 'secondary' | 'tertiary' | 'contrast', string>
type StatusShades = Record<
  'success' | 'warning' | 'danger' | 'info' | 'contrast',
  string
>

type SocialShades = Record<
  'google' | 'facebook' | 'instagram' | 'linkedin' | 'twitter',
  string
>

type System = Record<keyof Shades | 'grey' | 'greydark', 'greylight', string>

type Color<T, M> = Record<`${T}-${keyof M}`, M[keyof M]>

type FontTypes =
  | 'big-title'
  | 'medium-title'
  | 'regular-title'
  | 'small-title'
  | 'super-small-title'
  | 'super-big-label'
  | 'big-label'
  | 'medium-label'
  | 'small-label'
  | 'super-small-label'

type FontStyles = Record<
  FontTypes,
  {
    family: string
    size: string
    weight: number
  }
>

declare namespace Styles {
  type SystemColors = Color<'system', System>
  type StatusColors = Color<'status', StatusShades>
  type SocialColors = Color<'social', SocialShades>

  type Fonts = FontTypes

  type Colors = keyof SystemColors | keyof StatusColors | keyof SocialColors
}

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      system: System
      status: StatusShades
      social: SocialShades
    }
    fonts: FontStyles
  }
}
