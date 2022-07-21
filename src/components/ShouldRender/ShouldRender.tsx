import React from 'react'

type Props = {
  if: unknown
  children: React.ReactNode
}

const ShouldRender: React.FC<Props> = ({ if: condition, children }) => (
  // eslint-disable-next-line react/jsx-no-useless-fragment
  <>{condition ? children : null}</>
)

export default ShouldRender
