import { localeSchema } from '@utils/localeSchema'
import * as yup from 'yup'
import { setLocale } from 'yup'

setLocale(localeSchema)

const formSchema = yup.object().shape({
  email: yup.string().trim().required().email(),
  password: yup.string().trim().required().min(6)
})

export { formSchema }
