import React, { FC, useCallback, useState } from 'react'
import { InputNumber } from './index'

export default { title: 'InputNumber' }

export const Common: FC = () => {
    const [count, setCount] = useState<number>()

    const handleChange = useCallback((value: number): void => {
        setCount(value)
    }, [])

    return <InputNumber value={count} onChange={handleChange} />
}

export const Disabled: FC = () => {
    const [count, setCount] = useState<number>()

    const handleChange = useCallback((value: number): void => {
        setCount(value)
    }, [])

    return <InputNumber value={count} onChange={handleChange} disabled />
}

export const TresholdValue: FC = () => {
    const [count, setCount] = useState<number>()

    const handleChange = useCallback((value: number): void => {
        setCount(value)
    }, [])

    return (
        <>
            <p>max:10, min:0</p>
            <InputNumber value={count} onChange={handleChange} max={10} min={0} />
        </>
    )
}

export const Precision: FC = () => {
    const [count, setCount] = useState<number>()

    const handleChange = useCallback((value: number): void => {
        setCount(value)
    }, [])

    return <InputNumber value={count} onChange={handleChange} precision={2} />
}
