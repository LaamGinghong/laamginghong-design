import React, { FC, useCallback, useState } from 'react'
import { Select } from './index'

export default { title: 'Select' }

export const Common: FC = () => {
    return (
        <Select
            data={[
                { value: 1, name: '三星' },
                { value: 2, name: '苹果' },
                { value: 3, name: '华为' },
                { value: 4, name: '小米' },
            ]}
            onSelect={(value: number): void => console.log(value)}
        />
    )
}

export const Control: FC = () => {
    const [value, setValue] = useState<number>()
    return (
        <Select
            value={value}
            data={[
                { value: 1, name: '三星' },
                { value: 2, name: '苹果' },
                { value: 3, name: '华为' },
                { value: 4, name: '小米' },
            ]}
            onSelect={setValue}
        />
    )
}

export const Disabled: FC = () => {
    return (
        <>
            <Select
                disabled
                data={[
                    { value: 1, name: '三星' },
                    { value: 2, name: '苹果' },
                    { value: 3, name: '华为' },
                    { value: 4, name: '小米' },
                ]}
                onSelect={(value: number): void => console.log(value)}
            />
            <Select
                data={[
                    { value: 1, name: '三星', disabled: true },
                    { value: 2, name: '苹果' },
                    { value: 3, name: '华为' },
                    { value: 4, name: '小米' },
                ]}
                onSelect={(value: number): void => console.log(value)}
            />
        </>
    )
}

export const ShowSearch: FC = () => {
    return (
        <Select
            showSearch
            data={[
                { value: 1, name: '三星' },
                { value: 2, name: '苹果' },
                { value: 3, name: '华为' },
                { value: 4, name: '小米' },
            ]}
            onSelect={(value: number): void => console.log(value)}
        />
    )
}

export const Multiple: FC = () => {
    return (
        <Select
            multiple
            maxCount={2}
            style={{ width: '200px' }}
            data={[
                { value: 1, name: '三星' },
                { value: 2, name: '苹果' },
                { value: 3, name: '华为' },
                { value: 4, name: '小米' },
            ]}
            onSelect={(value: number): void => console.log(value)}
        />
    )
}
