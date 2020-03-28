import React, { FC } from 'react'
import { Divider } from './index'

export default { title: 'Divider' }

export const Common: FC = () => {
    return (
        <div>
            Text
            <Divider />
            Text
            <Divider />
            Text
        </div>
    )
}

export const Dashed: FC = () => {
    return (
        <div>
            Text
            <Divider dashed />
            Text
        </div>
    )
}

export const Vertical: FC = () => {
    return (
        <div>
            Text
            <Divider direction='vertical' />
            Text
            <Divider direction='vertical' />
            Text
        </div>
    )
}
