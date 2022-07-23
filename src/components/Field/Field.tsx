/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Styles } from '@styles/Theme'
import { Controller } from 'react-hook-form'
import Shimmer from '@components/Shimmer'
import { Text } from '../Text'
import ShouldRender from '../ShouldRender/ShouldRender'
import TextField, { TextFieldProps } from './TextField/TextField'
import Textarea, { TextAreaProps } from './Textarea/Textarea'
import * as S from './styles'

type Error = {
  key: string
  values?: { value: string }
}

type Props = Partial<TextFieldProps & TextAreaProps>

export type FieldProps = Omit<Props, 'defaultValue'> & {
  label?: string
  error?: Error
  backgroundColor?: Styles.Colors
  defaultValue?: any
  name: string
  control: any
  optional?: boolean
  hasPasswordEye?: boolean
  className?: string
  loading?: boolean
  rounded?: boolean
  type?: 'text' | 'password' | 'email' | 'textarea'
}

const Field: React.FC<FieldProps> = (props) => {
  const {
    label,
    error,
    name,
    control,
    optional,
    hasPasswordEye,
    defaultValue,
    backgroundColor,
    loading,
    type = 'text'
  } = props

  const { t } = useTranslation()

  const isType = (compare: string) => type === compare

  const isText = isType('text') || isType('email')
  const isPassword = isType('password')
  const isTextArea = isType('textarea')

  const [passwordVisible, setPasswordVisible] = useState(false)

  const handleClickPasswordEye = useCallback(() => {
    setPasswordVisible(!passwordVisible)
  }, [passwordVisible])

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <S.Container className="field">
          <ShouldRender if={label}>
            <Text
              tag="label"
              size="15px"
              weight={500}
              loading={loading}
              isRandomWidth
            >
              {label}{' '}
              <ShouldRender if={optional}>
                <Text tag="span" size="12px">
                  (Optional)
                </Text>
              </ShouldRender>
            </Text>
          </ShouldRender>
          <ShouldRender if={error}>
            <Text
              color="status-danger"
              size="12px"
              weight={600}
              style={{ marginTop: 6 }}
            >
              {t(error?.key, error?.values)}
            </Text>
          </ShouldRender>
          <ShouldRender if={loading}>
            <Shimmer
              style={{
                height: 44,
                width: '100%',
                marginTop: 8,
                marginBottom: 15
              }}
            />
          </ShouldRender>
          <ShouldRender if={!loading}>
            <ShouldRender if={isText}>
              <TextField {...props} field={field} />
            </ShouldRender>
            <ShouldRender if={isPassword}>
              <S.PasswordFieldContainer>
                <TextField
                  {...props}
                  field={field}
                  type={passwordVisible ? 'text' : 'password'}
                  style={hasPasswordEye && { paddingRight: '50px' }}
                />
                <ShouldRender if={hasPasswordEye && passwordVisible}>
                  <S.PasswordVisibleIcon onClick={handleClickPasswordEye} />
                </ShouldRender>
                <ShouldRender if={hasPasswordEye && !passwordVisible}>
                  <S.PasswordHiddenIcon onClick={handleClickPasswordEye} />
                </ShouldRender>
              </S.PasswordFieldContainer>
            </ShouldRender>
            <ShouldRender if={isTextArea}>
              <Textarea
                {...props}
                field={field}
                backgroundColor={backgroundColor}
              />
            </ShouldRender>
          </ShouldRender>
        </S.Container>
      )}
    />
  )
}

export default Field
