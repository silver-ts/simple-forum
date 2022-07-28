import { localeSchema } from '@utils/localeSchema'
import * as yup from 'yup'
import { setLocale } from 'yup'

setLocale(localeSchema)

const formSchema = yup.object().shape({
  title: yup.string().trim().required().min(4).max(300),
  body: yup.string().trim().required().min(4).max(40000)
})

export { formSchema }
