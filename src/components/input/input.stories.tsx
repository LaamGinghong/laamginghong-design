import React, { FC } from 'react'
import Input from './input'

export default { title: 'Input' }

export const Common: FC = () => {
    return <Input />
}

export const Disabled: FC = () => {
    return <Input disabled />
}
