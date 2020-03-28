import React, { useCallback, MutableRefObject, ReactNode, useState, forwardRef, useImperativeHandle, ReactNodeArray } from 'react'
import { Trigger, TriggerType } from '../trigger'
import { PopoverContainer } from '../container'
import { Portal } from '../portal'
import Popup from './popup'
import { PopoverPlacement, popoverConfig } from '../config'

const { config } = popoverConfig

export interface PopoverProps {
    trigger?: TriggerType
    content: ReactNode
    title?: ReactNode
    placement?: PopoverPlacement
    children: ReactNode | ReactNodeArray
}

export interface PopoverClose {
    close(): void
}

const container = PopoverContainer.create('popover-container')

const Popover = forwardRef<PopoverClose, PopoverProps>(({ children, title, trigger, placement, content }, ref) => {
    const [visible, setVisible] = useState(false)
    const [containerRef, setContainerRef] = useState<MutableRefObject<HTMLElement>>()
    let timer: number
    let globalDuration: number

    const handleTrigger = useCallback((e: MutableRefObject<HTMLElement>) => {
        setVisible(true)
        setContainerRef(e)
    }, [])

    useImperativeHandle(
        ref,
        (): PopoverClose => {
            return {
                close(): void {
                    setVisible(false)
                },
            }
        },
    )

    const handleClose = useCallback(
        (duration: number): void => {
            globalDuration = duration
            timer = window.setTimeout(() => {
                setVisible(false)
            }, duration)
        },
        [trigger],
    )

    const handleToggle = useCallback(
        (e: boolean): void => {
            if (trigger !== 'hover') {
                return
            }
            if (e) {
                setTimeout(() => {
                    setVisible(false)
                }, globalDuration)
            } else {
                clearTimeout(timer)
            }
        },
        [trigger],
    )

    return (
        <>
            <Trigger config={config} onClose={handleClose} trigger={trigger ?? config.trigger} onTrigger={handleTrigger}>
                {children}
            </Trigger>
            {visible && (
                <Portal container={container}>
                    <Popup onToggle={handleToggle} placement={placement ?? config.placement} container={containerRef}>
                        {title}
                        {content}
                    </Popup>
                </Portal>
            )}
        </>
    )
})

Popover.displayName = 'Popover'

export default Popover
