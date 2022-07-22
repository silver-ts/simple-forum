import useGetCurrentLocale from '@utils/useGetCurrentLocale'
import { formatDistanceToNow } from 'date-fns'

const useFormattedDistanceToNow = (date: number | Date) =>
  formatDistanceToNow(date || 0, {
    includeSeconds: true,
    locale: useGetCurrentLocale(),
    addSuffix: true
  })

export default useFormattedDistanceToNow
