import React, { FC } from 'react'
import { Button } from './index'

export default { title: 'Button' }

export const Common: FC = () => {
    return (
        <>
            <Button style={{ marginRight: '10px' }}>default</Button>
            <Button style={{ marginRight: '10px' }} type='primary'>
                primary
            </Button>
            <Button style={{ marginRight: '10px' }} type='danger'>
                danger
            </Button>
            <Button type='link'>link</Button>
        </>
    )
}

export const Loading: FC = () => {
    return (
        <>
            <Button style={{ marginRight: '10px' }} loading>
                loading
            </Button>
            <Button style={{ marginRight: '10px' }} type='primary' loading>
                loading
            </Button>
            <Button style={{ marginRight: '10px' }} type='danger' loading>
                loading
            </Button>
            <Button type='link' loading>
                loading
            </Button>
        </>
    )
}

export const Size: FC = () => {
    return (
        <>
            <Button size='small'>small</Button>
            <Button style={{ marginLeft: '10px' }}>default</Button>
            <Button size='large' style={{ marginLeft: '10px' }}>
                large
            </Button>
        </>
    )
}

export const Block: FC = () => {
    return (
        <>
            <Button block>default</Button>
            <Button type='primary' block>
                primary
            </Button>
            <Button type='danger' block>
                danger
            </Button>
            <Button type='link' block>
                link
            </Button>
        </>
    )
}

export const Disabled: FC = () => {
    return (
        <>
            <Button disabled style={{ marginRight: '10px' }}>
                default
            </Button>
            <Button disabled style={{ marginRight: '10px' }} type='primary'>
                primary
            </Button>
            <Button disabled style={{ marginRight: '10px' }} type='danger'>
                danger
            </Button>
            <Button disabled type='link'>
                link
            </Button>
        </>
    )
}
