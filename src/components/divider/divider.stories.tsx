import React, { ReactNode } from 'react'
import { Divider } from './index'

export default { title: 'Divider' }

export const common = (): ReactNode => {
  return (
    <div>
      Text
      <Divider />
      Text
      <Divider />
      Text
    </div>
  )
}

export const dashed = (): ReactNode => {
  return (
    <div>
      Text
      <Divider dashed />
      Text
    </div>
  )
}

export const vertical = (): ReactNode => {
  return (
    <div>
      Text
      <Divider direction='vertical' />
      Text
      <Divider direction='vertical' />
      Text
    </div>
  )
}
