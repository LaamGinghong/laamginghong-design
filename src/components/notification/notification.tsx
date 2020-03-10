import React, { Component, MouseEvent, ReactNode } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { CloseOutlined } from '@ant-design/icons'
import {
  notificationConfig,
  NotificationConfigOptions,
  NotificationType,
  iconMap,
} from '../config'
import { Flex } from '../flex'
import './style.less'
import { NotificationContainer } from '../container'

export interface NotificationBasicProps {
  title?: ReactNode
  type?: NotificationType
  description: ReactNode
}

interface NotificationProps extends NotificationBasicProps {
  node: HTMLDivElement
  container: HTMLElement
  duration: number
}

class Notification extends Component<NotificationProps> {
  private _handleStopPropagation = (e: MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation()
  }

  private _handleClose = (): void => {
    const { node, container } = this.props
    unmountComponentAtNode(node)
    container.removeChild(node)
  }

  render():
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | string
    | number
    | {}
    | React.ReactNodeArray
    | React.ReactPortal
    | boolean
    | null
    | undefined {
    const { title, type, description } = this.props

    return (
      <Flex
        alignItems='start'
        className='notification-item'
        onClick={this._handleStopPropagation}>
        {iconMap[type]}
        <div className='notification-content'>
          <div className='notification-title'>{title}</div>
          {description && (
            <div className='notification-description'>{description}</div>
          )}
        </div>
        <CloseOutlined
          className='notification-close'
          onClick={this._handleClose}
        />
      </Flex>
    )
  }
}

const placementMap = {
  topLeft: 'notification-left',
  topRight: 'notification-right',
  bottomLeft: 'notification-left',
  bottomRight: 'notification-right',
}

const api = {
  create(
    config: NotificationConfigOptions &
      NotificationBasicProps & { type: NotificationType },
  ): void {
    const container = NotificationContainer.create('notification-container')
    const node = document.createElement('div')
    container.appendChild(node)
    const { type, title, description } = config
    const duration = config.duration ?? notificationConfig.config.duration
    const maxCount = config.maxCount ?? notificationConfig.config.maxCount
    const top = config.top ?? notificationConfig.config.maxCount
    const bottom = config.bottom ?? notificationConfig.config.bottom
    const placement = config.placement ?? notificationConfig.config.placement
    node.setAttribute('class', `notification ${placementMap[placement]}`)
    if (/top/.test(placement)) {
      node.setAttribute('style', `top: ${top}px`)
    }
    if (/bottom/.test(placement)) {
      node.setAttribute('style', `bottom: ${bottom}px`)
    }
    if (container.childElementCount > maxCount) {
      const [first] = Array.from(container.childNodes)
      container.removeChild(first)
    }
    setTimeout(() => {
      unmountComponentAtNode(node)
      container.removeChild(node)
    }, duration)
    render(
      <Notification
        type={type}
        title={title}
        container={container}
        description={description}
        node={node}
        duration={duration}
      />,
      node,
    )
  },
  info(config: NotificationConfigOptions & NotificationBasicProps): void {
    const type = config.type ?? 'info'
    this.create({ ...config, type })
  },
  success(config: NotificationConfigOptions & NotificationBasicProps): void {
    const type = config.type ?? 'success'
    this.create({ ...config, type })
  },
  warning(config: NotificationConfigOptions & NotificationBasicProps): void {
    const type = config.type ?? 'warning'
    this.create({ ...config, type })
  },
  error(config: NotificationConfigOptions & NotificationBasicProps): void {
    const type = config.type ?? 'error'
    this.create({ ...config, type })
  },
  destroy(): void {
    NotificationContainer.destroy()
  },
}

export default api
