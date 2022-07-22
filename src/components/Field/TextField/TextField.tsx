import { Styles } from '@styles/Theme'
import useResolveColor from '@utils/useResolveColor'
import React from 'react'
import { ControllerRenderProps } from 'react-hook-form'
import * as S from './styles'

export type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  field: ControllerRenderProps
  backgroundColor?: Styles.Colors
}

const TextField: React.FC<TextFieldProps> = ({
  field,
  backgroundColor = 'system-secondary',
  ...props
}: TextFieldProps) => {
  const resolveColor = useResolveColor()

  return (
    <S.Input
      className="form-input"
      autoComplete="off"
      backgroundColor={resolveColor(backgroundColor)}
      {...props}
      {...field}
    />
  )
}

export default TextField
