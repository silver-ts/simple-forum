import { localeSchema } from '@utils/localeSchema'
import * as yup from 'yup'
import { setLocale } from 'yup'

setLocale(localeSchema)

const formSchema = yup.object().shape({
  email: yup.string().trim().required().email().min(3).max(75),
  password: yup.string().trim().required().min(6).max(50),
  passwordConfirmation: yup
    .string()
    .required()
    .oneOf([yup.ref('password'), null]),
  username: yup.string().trim().required().min(3).max(75),
  displayName: yup.string().trim().required().min(3).max(75)
})

export { formSchema }
