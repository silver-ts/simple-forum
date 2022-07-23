import { FC, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { PageWrapper } from '@pages/PageWrapper'
import { Button } from '@components/Button'
import { REGISTER } from '@constants/queries'
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

const Register: FC = () => {
  const { t } = useTranslation()

  const [mutateFunction, { loading, error }] = useMutation(REGISTER)

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
    mutateFunction({
      variables: {
        email: payload?.email,
        username: payload?.username,
        displayName: payload?.displayName,
        password: payload?.password
      }
    })
      .then((response) => {
        setToken(response.data.register.token)
        setUser(response.data.register.user)
        // TODO: Remove localStorage and replace with zustrand
        localStorage.setItem('cluster-token', response.data.register)
      })
      .then(() => {
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
            <Text type="big-title">{t('register')}</Text>
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
                type="text"
                label={t('username')}
                placeholder={t('yourUsername')}
                name="username"
                control={control}
                error={errors?.username?.message}
              />
              <Field
                type="text"
                label={t('displayname')}
                placeholder={t('yourDisplayName')}
                name="displayName"
                control={control}
                error={errors?.displayName?.message}
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
              <Field
                type="password"
                label={t('confirmPassword')}
                placeholder={t('yourPassword')}
                hasPasswordEye
                name="passwordConfirmation"
                control={control}
                error={errors?.passwordConfirmation?.message}
              />
              <Button
                type="submit"
                label={t('register')}
                width={200}
                backgroundColor="social-instagram"
                textColor="status-contrast"
                onClick={handleSubmit(handleClick)}
                loading={loading}
              />
              <Text
                tag="a"
                type="small-title"
                style={{ marginTop: '15px' }}
                underline
                onClick={goTo('/login')}
              >
                {t('alreadyHaveAccount')}
              </Text>
            </S.Form>
          </ShouldRender>
        </S.Content>
      </S.Container>
    </PageWrapper>
  )
}

export default Register
