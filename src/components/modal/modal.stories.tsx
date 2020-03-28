import React, { FC, useCallback } from 'react'
import Modal from './modal'
import { Button } from '../button'

export default { title: 'Modal' }

export const Common: FC = () => {
    return (
        <Modal title='Title'>
            <div>content</div>
        </Modal>
    )
}

export const SpeedCreate: FC = () => {
    const handleCreate = useCallback((): void => {
        Modal.create({ content: <div>Content</div>, title: 'Title' })
    }, [])

    return <Button onClick={handleCreate}>Create</Button>
}

export const NoFooter: FC = () => {
    return (
        <Modal title='Title' footer={null}>
            <div>content</div>
        </Modal>
    )
}

export const Loading: FC = () => {
    const handleOk = useCallback((): Promise<void> => {
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve()
            }, 2000)
        })
    }, [])

    const handleCreate = useCallback((): void => {
        Modal.create({
            content: <div>Content</div>,
            title: 'Title',
            onOk: handleOk,
        })
    }, [])

    return <Button onClick={handleCreate}>Create</Button>
}

export const NoMask: FC = () => {
    return (
        <>
            <Button>Button</Button>
            <Modal mask={false}>
                <div>Content</div>
            </Modal>
        </>
    )
}
