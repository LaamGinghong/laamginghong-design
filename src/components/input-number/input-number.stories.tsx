import React, { FC, useCallback, useState } from 'react'
import { InputNumber } from './input-number'
import { Button } from '../button'
import { Select } from '../select'

export default { title: 'InputNumber' }

export const Common: FC = () => {
    return <InputNumber />
}

export const Disabled: FC = () => {
    return <InputNumber disabled />
}

export const Control: FC = () => {
    const [count, setCount] = useState(10)

    const handleAdd = useCallback((): void => {
        setCount(count + 10)
    }, [count])

    console.log(count)
    return (
        <>
            <InputNumber value={count} onChange={setCount} />
            <Button onClick={handleAdd}>Add</Button>
        </>
    )
}

export const Precision: FC = () => {
    const [precision, setPrecision] = useState(0)

    return (
        <>
            <Select
                data={[
                    { value: 0, name: '0' },
                    { value: 1, name: '1' },
                    { value: 2, name: '2' },
                    { value: 3, name: '3' },
                ]}
                value={precision}
                onSelect={setPrecision}
            />
            <InputNumber defaultValue={20} precision={precision} />
        </>
    )
}

export const TresholdValue: FC = () => {
    const [max, setMax] = useState<number>()
    const [min, setMin] = useState<number>()
    const [count, setCount] = useState<number>()

    return (
        <>
            <Select
                placeholder='min'
                data={[
                    { value: 0, name: '0' },
                    { value: 5, name: '5' },
                ]}
                value={min}
                onSelect={setMin}
            />
            <Select
                placeholder='max'
                data={[
                    { value: 10, name: '10' },
                    { value: 20, name: '20' },
                ]}
                value={max}
                onSelect={setMax}
            />
            <InputNumber
                value={count}
                onChange={setCount}
                max={max}
                min={min}
            />
        </>
    )
}
