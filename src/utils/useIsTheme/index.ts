import { dark, light } from '@styles/theme'
import { Styles } from '@styles/Theme'
import { useTheme } from 'styled-components'

// eslint-disable-next-line consistent-return
const useIsTheme = (darkColor?: Styles.Colors, lightColor?: Styles.Colors) => {
  const theme = useTheme()

  if (theme === dark) {
    return darkColor || undefined
  }

  if (theme === light) {
    return lightColor || undefined
  }
}

export default useIsTheme
