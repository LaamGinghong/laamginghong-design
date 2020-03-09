import React, { ReactNode } from 'react'
import Input from './input'

export default { title: 'Input' }

export const common = (): ReactNode => {
  return <Input />
}

export const disabled = (): ReactNode => {
  return <Input disabled />
}
