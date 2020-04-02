import React, { FC, useCallback, useState } from 'react'
import { Select } from './index'

export default { title: 'Select' }

export const Common: FC = () => {
    const [selected, setSelected] = useState<number>()

    const handleSelect = useCallback((value: number): void => {
        setSelected(value)
    }, [])

    return (
        <Select
            style={{ width: '180px' }}
            data={[
                { value: 1, name: '苹果' },
                { value: 2, name: '雪梨' },
                { value: 3, name: '西瓜' },
            ]}
            value={selected}
            onChange={handleSelect}
        />
    )
}

export const Disabled: FC = () => {
    const [selected, setSelected] = useState<number>()

    const handleSelect = useCallback((value: number): void => {
        setSelected(value)
    }, [])

    return (
        <>
            <Select
                disabled
                style={{ width: '180px' }}
                data={[
                    { value: 1, name: '苹果' },
                    { value: 2, name: '雪梨' },
                    { value: 3, name: '西瓜' },
                ]}
                value={selected}
                onChange={handleSelect}
            />
            <Select
                style={{ width: '180px' }}
                data={[
                    { value: 1, name: '苹果', disabled: true },
                    { value: 2, name: '雪梨' },
                    { value: 3, name: '西瓜' },
                ]}
                value={selected}
                onChange={handleSelect}
            />
        </>
    )
}

export const Search: FC = () => {
    const [selected, setSelected] = useState<number>()

    const handleSelect = useCallback((value: number): void => {
        setSelected(value)
    }, [])

    return (
        <Select
            showSearch
            allowClear
            placeholder='请选择'
            searchInputPlaceholder='请输入'
            style={{ width: '180px' }}
            data={[
                { value: 1, name: '苹果' },
                { value: 2, name: '雪梨' },
                { value: 3, name: '西瓜' },
            ]}
            value={selected}
            onChange={handleSelect}
        />
    )
}

export const Multiple: FC = () => {
    const [selected, setSelected] = useState<number[]>()

    const handleSelect = useCallback((value: number[]): void => {
        setSelected(value)
    }, [])

    return (
        <Select
            style={{ width: '180px' }}
            multiple
            maxCount={2}
            data={[
                { value: 1, name: '苹果' },
                { value: 2, name: '雪梨' },
                { value: 3, name: '西瓜' },
                { value: 4, name: '橘子' },
                { value: 5, name: '橙子' },
                { value: 6, name: '柚子' },
            ]}
            value={selected}
            onChange={handleSelect}
        />
    )
}
