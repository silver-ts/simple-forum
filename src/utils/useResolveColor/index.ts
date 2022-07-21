import { Styles } from '@styles/Theme'
import { useTheme } from 'styled-components'

const useResolveColor = () => {
  const theme = useTheme()

  const resolve = (color: Styles.Colors) => {
    const [key, value] = color.split('-')

    return theme.colors?.[key]?.[value]
  }

  return resolve
}

export default useResolveColor
