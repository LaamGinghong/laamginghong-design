import React, { FC, useCallback, useState } from 'react'
import { Checkbox, CheckboxGroup } from './index'

export default { title: 'Checkbox' }

export const Common: FC = () => {
    return (
        <>
            <Checkbox checked value={1} onChange={null}>
                苹果
            </Checkbox>
            <Checkbox checked={false} value={2} onChange={null}>
                雪梨
            </Checkbox>
        </>
    )
}

export const Group: FC = () => {
    const [checked, setChecked] = useState<number[]>([])

    const handleCheck = useCallback((value: number[]): void => {
        setChecked(value)
    }, [])

    return (
        <CheckboxGroup
            options={[
                { value: 1, label: '苹果' },
                { value: 2, label: '雪梨' },
            ]}
            value={checked}
            onChange={handleCheck}
        />
    )
}

export const Disabled: FC = () => {
    const [checked, setChecked] = useState<number[]>([1])

    const handleCheck = useCallback((value: number[]): void => {
        setChecked(value)
    }, [])

    return (
        <CheckboxGroup
            disabled
            options={[
                { value: 1, label: '苹果' },
                { value: 2, label: '雪梨' },
            ]}
            value={checked}
            onChange={handleCheck}
        />
    )
}

export const Block: FC = () => {
    const [checked, setChecked] = useState<number[]>([1])

    const handleCheck = useCallback((value: number[]): void => {
        setChecked(value)
    }, [])

    return (
        <CheckboxGroup
            block
            options={[
                { value: 1, label: '苹果' },
                { value: 2, label: '雪梨' },
            ]}
            value={checked}
            onChange={handleCheck}
        />
    )
}
