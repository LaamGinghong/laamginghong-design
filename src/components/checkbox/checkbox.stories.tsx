import React, { FC, useState } from 'react'
import { Checkbox, CheckboxGroup } from './index'
import { Button } from '../button'

export default { title: 'Checkbox' }

export const Common: FC = () => {
    return (
        <Checkbox name='apple' value='apple'>
            苹果
        </Checkbox>
    )
}

export const Disabled: FC = () => {
    const [checked, setChecked] = useState(false)
    const [disabled, setDisabled] = useState(false)

    const handleCheck = (): void => {
        setChecked(!checked)
    }

    const handleDisabled = (): void => {
        setDisabled(!disabled)
    }

    return (
        <>
            <Button onClick={handleCheck}>toggle checked</Button>
            <Button onClick={handleDisabled}>toggle disabled</Button>
            <Checkbox
                checked={checked}
                id='apple'
                disabled={disabled}
                onChange={(event): void => setChecked(event.target.checked)}>
                苹果
            </Checkbox>
        </>
    )
}

export const Group: FC = () => {
    const [value, setValue] = useState<string[]>([])

    return (
        <CheckboxGroup
            value={value}
            onChange={(data) => {
                setValue(data)
            }}
            options={[
                { label: '苹果', value: 'apple' },
                { label: '西瓜', value: 'watermelon' },
            ]}
        />
    )
}
