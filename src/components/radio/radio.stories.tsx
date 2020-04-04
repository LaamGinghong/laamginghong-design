import React, { FC, useState } from 'react'
import Radio from './radio'
import RadioGroup from './radio-group'

export default { title: 'Radio' }

export const Common: FC = () => {
    return (
        <Radio value='apple' name='apple'>
            苹果
        </Radio>
    )
}

export const Control: FC = () => {
    const [checked, setChecked] = useState(false)

    return (
        <Radio
            checked={checked}
            onChange={(event): void => setChecked(event.target.checked)}
            value='apple'
            name='apple'>
            苹果
        </Radio>
    )
}

export const Group: FC = () => {
    return (
        <RadioGroup
            options={[
                { value: '1', label: '苹果' },
                { value: '2', label: '雪梨' },
            ]}
        />
    )
}
