import React, { FC, useCallback, useState } from 'react'
import { Switch } from './index'
import { RadioGroup } from '../radio'

export default { title: 'Switch' }

export const Common: FC = () => {
    const [checked, setChecked] = useState(false)

    const handleCheck = useCallback((checked: boolean): void => {
        setChecked(checked)
    }, [])

    return <Switch checked={checked} onChange={handleCheck} />
}

export const WithText: FC = () => {
    const [checked, setChecked] = useState(false)

    const handleCheck = useCallback((checked: boolean): void => {
        setChecked(checked)
    }, [])

    return (
        <Switch
            checked={checked}
            onChange={handleCheck}
            checkedText='是'
            unCheckedText='否'
        />
    )
}

export const Disabled: FC = () => {
    return (
        <>
            <div>
                <Switch checked onChange={null} disabled />
            </div>
            <div>
                <Switch checked={false} onChange={null} disabled />
            </div>
        </>
    )
}

export const Size: FC = () => {
    const [checked, setChecked] = useState(false)
    const [size, setSize] = useState<'small'>()

    const handleCheck = useCallback((checked: boolean): void => {
        setChecked(checked)
    }, [])

    const handleChange = useCallback((value: 'small'): void => {
        setSize(value)
    }, [])

    return (
        <>
            <RadioGroup
                value={size}
                options={[
                    { value: 'small', label: 'small' },
                    { value: null, label: 'default' },
                ]}
                onChange={handleChange}
            />
            <Switch
                checked={checked}
                size={size}
                onChange={handleCheck}
                checkedText='是'
                unCheckedText='否'
            />
        </>
    )
}

export const Loading: FC = () => {
    const [checked, setChecked] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleCheck = useCallback((checked: boolean): void => {
        setChecked(checked)
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }, [])

    return <Switch checked={checked} onChange={handleCheck} loading={loading} />
}
