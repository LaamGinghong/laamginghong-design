import React, { FC, useCallback, useState } from 'react'
import { Switch } from './switch'
import { RadioGroup } from '../radio'

export default { title: 'Switch' }

export const Common: FC = () => {
    return <Switch onChange={(checked): void => console.log(checked)} />
}

export const Control: FC = () => {
    const [checked, setChecked] = useState(false)

    return <Switch checked={checked} onChange={setChecked} />
}

export const WithText: FC = () => {
    return (
        <Switch
            checkedText='是'
            unCheckedText='否'
            onChange={(checked): void => console.log(checked)}
        />
    )
}

export const Disabled: FC = () => {
    return (
        <>
            <div>
                <Switch defaultChecked disabled />
            </div>
            <div>
                <Switch disabled />
            </div>
        </>
    )
}

export const Size: FC = () => {
    const [size, setSize] = useState<'small'>()

    const handleChange = useCallback((value: 'small'): void => {
        setSize(value)
    }, [])

    return (
        <>
            <RadioGroup
                value={size}
                name='size'
                options={[
                    { value: 'small', label: 'small' },
                    { value: null, label: 'default' },
                ]}
                onChange={handleChange}
            />
            <Switch size={size} checkedText='是' unCheckedText='否' />
        </>
    )
}

export const Loading: FC = () => {
    const [loading, setLoading] = useState(false)

    const handleCheck = useCallback((): void => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }, [])

    return <Switch onChange={handleCheck} loading={loading} />
}
