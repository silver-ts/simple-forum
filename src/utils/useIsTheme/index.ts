import { Styles } from '@styles/Theme'
import { useTheme } from 'styled-components'

const useIsTheme = (darkColor: Styles.Colors, lightColor: Styles.Colors) => {
  const theme = useTheme()

  if (theme.name === 'dark') {
    return darkColor
  }

  return lightColor
}

export default useIsTheme
