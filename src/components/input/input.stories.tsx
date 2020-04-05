import React, { ChangeEvent, FC, useState } from 'react'
import Input from './input'

export default { title: 'Input' }

export const Common: FC = () => {
    return <Input />
}

export const Control: FC = () => {
    const [value, setValue] = useState('')
    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setValue(event.target.value)
    }

    return <Input onChange={handleChange} value={value} />
}

export const Disabled: FC = () => {
    return <Input disabled />
}
