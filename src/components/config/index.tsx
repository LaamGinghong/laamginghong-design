import {
  messageConfig,
  MessageType,
  MessageConfigOptions,
} from './message.config'
import {
  notificationConfig,
  NotificationConfigOptions,
  NotificationPlacement,
  NotificationType,
} from './notification.config'
import React from 'react'
import {
  popoverConfig,
  PopoverConfigOptions,
  PopoverTrigger,
  PopoverPlacement,
} from './popover.config'
import {
  CheckCircleFilled,
  InfoCircleFilled,
  CloseCircleFilled,
  WarningFilled,
} from '@ant-design/icons/lib'
import './style.less'

export {
  messageConfig,
  MessageConfigOptions,
  MessageType,
  NotificationPlacement,
  NotificationConfigOptions,
  NotificationType,
  notificationConfig,
  popoverConfig,
  PopoverTrigger,
  PopoverConfigOptions,
  PopoverPlacement,
}

export const iconMap = {
  success: <CheckCircleFilled className='icon success' />,
  info: <InfoCircleFilled className='icon info' />,
  warning: <WarningFilled className='icon warning' />,
  error: <CloseCircleFilled className='icon error' />,
}
