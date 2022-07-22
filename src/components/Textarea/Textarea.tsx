import ShouldRender from '@components/ShouldRender'
import useResolveColor from '@utils/useResolveColor'
import React, { useMemo } from 'react'
import { Styles } from '@styles/Theme'
import { ControllerRenderProps } from 'react-hook-form'
import * as S from './styles'

export type TextAreaProps = React.InputHTMLAttributes<HTMLTextAreaElement> & {
  field: ControllerRenderProps
  backgroundColor?: Styles.Colors
}

const Textarea: React.FC<TextAreaProps> = (props: TextAreaProps) => {
  const { field, backgroundColor = 'system-jetblack', ...rest } = props

  const resolveColor = useResolveColor()

  const charactersLeft = useMemo(
    () => rest.maxLength - (field?.value?.length ?? 0),
    [field?.value]
  )

  const background = useMemo(() => {
    const color = resolveColor(backgroundColor)

    return color
  }, [backgroundColor])

  return (
    <S.Container backgroundColor={background}>
      <S.TextArea {...rest} {...field} />
      <ShouldRender if={rest.maxLength}>
        <S.CharactersLeftContainer>
          <S.CharactersLeft>{charactersLeft} characters left</S.CharactersLeft>
        </S.CharactersLeftContainer>
      </ShouldRender>
    </S.Container>
  )
}

export default Textarea
