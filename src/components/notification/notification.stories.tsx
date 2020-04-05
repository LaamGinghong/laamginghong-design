import React, { FC, useCallback, useState } from 'react'
import { Button } from '../button'
import { notification } from './index'
import { NotificationPlacement } from '../config'
import { Select } from '../select'
import { Flex } from '../flex'

export default { title: 'Notification' }

export const Common: FC = () => {
    const handleCreate = useCallback((): void => {
        notification.create({
            type: 'info',
            description: 'Description',
            title: 'Title',
        })
    }, [])

    return <Button onClick={handleCreate}>Create</Button>
}

export const SpeedCreate: FC = () => {
    const handleInfo = useCallback((): void => {
        notification.info({ title: 'Title', description: 'Info' })
    }, [])
    const handleSuccess = useCallback((): void => {
        notification.success({ title: 'Title', description: 'Success' })
    }, [])
    const handleWarning = useCallback((): void => {
        notification.warning({ title: 'Title', description: 'Warning' })
    }, [])
    const handleError = useCallback((): void => {
        notification.error({ title: 'Title', description: 'Error' })
    }, [])

    return (
        <>
            <Button style={{ marginRight: '10px' }} onClick={handleSuccess}>
                success
            </Button>
            <Button
                style={{ marginRight: '10px' }}
                type='primary'
                onClick={handleInfo}>
                info
            </Button>
            <Button
                style={{ marginRight: '10px' }}
                type='danger'
                onClick={handleError}>
                danger
            </Button>
            <Button type='link' onClick={handleWarning}>
                warning
            </Button>
        </>
    )
}

export const Placement: FC = () => {
    const [placement, setPlacement] = useState<NotificationPlacement>(
        'topRight',
    )

    const handleSelect = useCallback((value: NotificationPlacement): void => {
        setPlacement(value)
    }, [])

    const handleCreate = useCallback((): void => {
        notification.create({
            type: 'success',
            title: '标题',
            description:
                '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
            placement,
        })
    }, [placement])

    return (
        <Flex alignItems='center'>
            <Select
                data={[
                    { value: 'topRight', name: 'topRight' },
                    { value: 'topLeft', name: 'topLeft' },
                    { value: 'bottomLeft', name: 'bottomLeft' },
                    { value: 'bottomRight', name: 'bottomRight' },
                ]}
                value={placement}
                onSelect={handleSelect}
            />
            <Button onClick={handleCreate} style={{ marginLeft: '10px' }}>
                Create
            </Button>
        </Flex>
    )
}
