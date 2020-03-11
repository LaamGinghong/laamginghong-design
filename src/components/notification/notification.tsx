import React, { FC, ReactNode, useCallback } from 'react'
import { CloseOutlined } from '@ant-design/icons'
import {
  NotificationType,
  NotificationConfigOptions,
  notificationConfig,
  iconMap,
} from '../config'
import { Flex, FlexItem } from '../flex'
import './style.less'
import { NotificationContainer } from '../container'
import { render, unmountComponentAtNode } from 'react-dom'

export interface NotificationProps {
  type: NotificationType
  title?: ReactNode
  description: ReactNode
  container: HTMLDivElement
  node: HTMLDivElement
}

const Notification: FC<NotificationProps> = ({
  type,
  title,
  description,
  container,
  node,
}) => {
  const handleClose = useCallback((): void => {
    unmountComponentAtNode(node)
    container.removeChild(node)
  }, [])

  return (
    <Flex alignItems='start' className='notification-item'>
      {iconMap[type]}
      <FlexItem flex={1} className='notification-content'>
        {title && <div className='notification-title'>{title}</div>}
        <div className='notification-description'>{description}</div>
        <CloseOutlined className='notification-close' onClick={handleClose} />
      </FlexItem>
    </Flex>
  )
}

export interface NotificationCreateConfig extends NotificationConfigOptions {
  title?: ReactNode
  description: ReactNode
  type?: NotificationType
}

const placementClassMap = {
  topLeft: 'notification-top notification-left',
  topRight: 'notification-top notification-right',
  bottomLeft: 'notification-bottom notification-left',
  bottomRight: 'notification-bottom notification-right',
}

export default {
  create(config: NotificationCreateConfig & { type: NotificationType }): void {
    const {
      type,
      title,
      description,
      duration = notificationConfig.config.duration,
      maxCount = notificationConfig.config.maxCount,
      placement = notificationConfig.config.placement,
    } = config
    const container = NotificationContainer.create('notification-container')
    if (container.className !== placementClassMap[placement]) {
      container.removeAttribute('class')
      container.setAttribute('class', placementClassMap[placement])
      while (container.firstChild) {
        container.removeChild(container.firstChild)
      }
    }
    const node = document.createElement('div')
    node.setAttribute('class', 'notification')
    container.appendChild(node)
    if (container.childNodes.length > maxCount) {
      const [first] = Array.from(container.childNodes)
      container.removeChild(first)
    }
    render(
      <Notification
        type={type}
        description={description}
        container={container}
        node={node}
        title={title}
      />,
      node,
    )
    setTimeout(() => {
      unmountComponentAtNode(node)
      container.removeChild(node)
    }, duration)
  },
  info(config: NotificationCreateConfig): void {
    this.create({ ...config, type: 'info' })
  },
  success(config: NotificationCreateConfig): void {
    this.create({ ...config, type: 'success' })
  },
  error(config: NotificationCreateConfig): void {
    this.create({ ...config, type: 'error' })
  },
  warning(config: NotificationCreateConfig): void {
    this.create({ ...config, type: 'warning' })
  },
}
