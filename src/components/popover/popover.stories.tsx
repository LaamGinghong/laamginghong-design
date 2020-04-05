import React, { FC, useCallback, useRef, useState } from 'react'
import { Popover, PopoverClose } from './index'
import { Button } from '../button'
import { Flex } from '../flex'
import { Select } from '../select'
import { PopoverTrigger } from '../config'

export default { title: 'Popover' }

export const Common: FC = () => {
    return (
        <Popover content={<div>Content</div>} title={<div>Title</div>}>
            <Button>Click me</Button>
        </Popover>
    )
}

export const Trigger: FC = () => {
    const [trigger, setTrigger] = useState<PopoverTrigger>('click')

    const handleSelect = useCallback((value: PopoverTrigger): void => {
        setTrigger(value)
    }, [])

    return (
        <>
            <Flex alignItems='center'>
                <Select
                    data={[
                        { value: 'click', name: 'Click' },
                        { value: 'hover', name: 'Hover' },
                        { value: 'focus', name: 'Focus' },
                    ]}
                    value={trigger}
                    onSelect={handleSelect}
                />
                <Popover
                    content={<div>Content</div>}
                    title={<div>Title</div>}
                    trigger={trigger}>
                    <Button style={{ marginLeft: '10px' }}>Trigger</Button>
                </Popover>
            </Flex>
            {trigger === 'hover' && (
                <p>
                    如果trigger是focus，请确保Popover的children的props包含onFocus
                </p>
            )}
        </>
    )
}

export const HandleClose: FC = () => {
    const popoverRef = useRef<PopoverClose>()

    const handleClose = useCallback((): void => {
        popoverRef.current.close()
    }, [])

    return (
        <Popover
            ref={popoverRef}
            content={<Button onClick={handleClose}>Click me to close</Button>}
            title={<div>Title</div>}>
            <Button>Click me</Button>
        </Popover>
    )
}

export const Placement: FC = () => {
    return (
        <div style={{ marginLeft: '200px', marginTop: '100px' }}>
            <div style={{ marginLeft: '50px' }}>
                <Popover content='content' trigger='hover' placement='topLeft'>
                    <Button>TL</Button>
                </Popover>
                <Popover content='content' trigger='hover' placement='top'>
                    <Button>Top</Button>
                </Popover>
                <Popover content='content' trigger='hover' placement='topRight'>
                    <Button>TR</Button>
                </Popover>
            </div>
            <div>
                <Popover content='content' trigger='hover' placement='leftTop'>
                    <Button>LT</Button>
                </Popover>
                <Popover content='content' trigger='hover' placement='rightTop'>
                    <Button style={{ marginLeft: '160px' }}>RT</Button>
                </Popover>
            </div>
            <div>
                <Popover content='content' trigger='hover' placement='left'>
                    <Button>Left</Button>
                </Popover>
                <Popover content='content' trigger='hover' placement='right'>
                    <Button style={{ marginLeft: '151px' }}>Right</Button>
                </Popover>
            </div>
            <div>
                <Popover
                    content='content'
                    trigger='hover'
                    placement='leftBottom'>
                    <Button>LB</Button>
                </Popover>
                <Popover
                    content='content'
                    trigger='hover'
                    placement='rightBottom'>
                    <Button style={{ marginLeft: '160px' }}>RB</Button>
                </Popover>
            </div>
            <div style={{ marginLeft: '50px' }}>
                <Popover
                    content='content'
                    trigger='hover'
                    placement='bottomLeft'>
                    <Button>BL</Button>
                </Popover>
                <Popover content='content' trigger='hover' placement='bottom'>
                    <Button>Bottom</Button>
                </Popover>
                <Popover
                    content='content'
                    trigger='hover'
                    placement='bottomRight'>
                    <Button>BR</Button>
                </Popover>
            </div>
        </div>
    )
}
