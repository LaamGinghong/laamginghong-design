import React, { FC, MouseEvent, ReactNode } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { messageConfig, MessageConfigOptions, MessageType, iconMap } from '../config'
import { Flex } from '../flex'
import { MessageContainer } from '../container'
import './style.less'

export interface MessageProps {
    type?: MessageType
    content: ReactNode
}

const Message: FC<MessageProps> = ({ type, content }) => {
    const handleStopPropagation = (e: MouseEvent<HTMLDivElement>): void => {
        e.stopPropagation()
    }

    return (
        <Flex inline alignItems='center' className='message-item' onClick={handleStopPropagation}>
            {iconMap[type]}
            <div className='message-content'>{content}</div>
        </Flex>
    )
}

const api = {
    create(config: MessageConfigOptions & MessageProps & { type: MessageType }): void {
        const container = MessageContainer.create('message-container')
        const node = document.createElement('div')
        node.setAttribute('class', 'message')
        container.appendChild(node)
        const { type, content } = config
        const top = `${config.top ?? messageConfig.config.top}px`
        const duration = config.duration ?? messageConfig.config.duration
        const maxCount = config.maxCount ?? messageConfig.config.maxCount
        if (container.childElementCount > maxCount) {
            const [first] = Array.from(container.childNodes)
            container.removeChild(first)
        }
        container.setAttribute('style', `top: ${top}`)
        render(<Message type={type} content={content} />, node)
        setTimeout(() => {
            unmountComponentAtNode(node)
            container.removeChild(node)
        }, duration)
    },
    info(config: MessageConfigOptions & MessageProps): void {
        const type = config.type ?? 'info'
        this.create({ ...config, type })
    },
    success(config: MessageConfigOptions & MessageProps): void {
        const type = config.type ?? 'success'
        this.create({ ...config, type })
    },
    warning(config: MessageConfigOptions & MessageProps): void {
        const type = config.type ?? 'warning'
        this.create({ ...config, type })
    },
    error(config: MessageConfigOptions & MessageProps): void {
        const type = config.type ?? 'error'
        this.create({ ...config, type })
    },
    destroy(): void {
        MessageContainer.destroy()
    },
}

export default api
