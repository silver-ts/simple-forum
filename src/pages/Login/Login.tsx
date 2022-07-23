import { FC, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { PageWrapper } from '@pages/PageWrapper'
import { Button } from '@components/Button'
import { LOGIN } from '@constants/mutations'
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

  const [login, { loading, error }] = useMutation(LOGIN)

  const { setToken, setUser } = authStore()

  const [isAuthenticated] = useIsAuthenticated()

  const navigate = useNavigate()

  const goTo = useCallback((to: string) => () => navigate(to), [])

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(formSchema) })

  const handleClick = useCallback((payload) => {
    login({
      variables: { email: payload?.email, password: payload?.password }
    }).then((response) => {
      setToken(response.data.login.token)
      setUser(response.data.login.user)
      // TODO: Remove localStorage and replace with zustrand
      localStorage.setItem('cluster-token', response.data.login.token)
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
            <Text
              tag="a"
              type="small-title"
              style={{ marginTop: '35px' }}
              underline
              onClick={goTo('/')}
            >
              {t('goBackHome')}
            </Text>
          </ShouldRender>
          <ShouldRender if={!isAuthenticated}>
            <Text type="big-title">{t('login')}</Text>
            <S.Form>
              <Field
                type="email"
                label={t('email')}
                placeholder={t('yourEmail')}
                name="email"
                control={control}
                error={errors?.email?.message}
              />
              <Field
                type="password"
                label={t('password')}
                placeholder={t('yourPassword')}
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
                textColor="status-contrast"
                onClick={handleSubmit(handleClick)}
                loading={loading}
              />
              <Text
                tag="a"
                type="small-title"
                style={{ marginTop: '35px' }}
                underline
                onClick={goTo('/register')}
              >
                {t('dontHaveAccount')}
              </Text>
            </S.Form>
          </ShouldRender>
        </S.Content>
      </S.Container>
    </PageWrapper>
  )
}

export default Login
