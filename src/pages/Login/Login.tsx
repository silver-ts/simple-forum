import { FC, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { PageWrapper } from '@pages/PageWrapper'
import { Button } from '@components/Button'
import { LOGIN } from '@constants/queries'
import { yupResolver } from '@hookform/resolvers/yup'
import authStore from '@state/auth/auth'
import useIsAuthenticated from '@utils/useIsAuthenticated'
import { Field } from '@components/Field'
import ShouldRender from '@components/ShouldRender'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { Text } from '@components/Text'
import { toast } from 'react-toastify'

import { formSchema } from './_validations'
import * as S from './styles'

const Login: FC = () => {
  const { t } = useTranslation()

  const [mutateFunction, { loading, error }] = useMutation(LOGIN)

  const { setToken } = authStore()

  const [isAuthenticated] = useIsAuthenticated()

  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(formSchema) })

  const handleClick = useCallback((payload) => {
    mutateFunction({
      variables: { email: payload?.email, password: payload?.password }
    }).then((response) => {
      setToken(response.data.login)
      navigate('/')
    })
  }, [])

  useEffect(() => {
    if (error) toast.error(error?.message)
  }, [error])

  return (
    <PageWrapper noFooter>
      <S.Container>
        <S.Content>
          <ShouldRender if={isAuthenticated}>
            <Text type="big-title">{t('alreadyLogged')}</Text>
          </ShouldRender>
          <ShouldRender if={!isAuthenticated}>
            <Text type="big-title">{t('login')}</Text>
            <S.Form>
              <Field
                type="email"
                label={t('email')}
                name="email"
                control={control}
                error={errors?.email?.message}
              />
              <Field
                type="password"
                label={t('password')}
                hasPasswordEye
                name="password"
                control={control}
                error={errors?.password?.message}
              />
              <Button
                type="submit"
                label={t('login')}
                width={200}
                backgroundColor="social-instagram"
                textColor="system-grey"
                onClick={handleSubmit(handleClick)}
                loading={loading}
              />
            </S.Form>
          </ShouldRender>
        </S.Content>
      </S.Container>
    </PageWrapper>
  )
}

export default Login
