import {
  messageConfig,
  MessageType,
  MessageConfigProps,
} from './message.config'
import {
  notificationConfig,
  NotificationConfigProps,
  NotificationPlacement,
  NotificationType,
} from './notification.config'
import { Error, Info, Success, Warning } from '../icon'
import React from 'react'

export {
  messageConfig,
  MessageConfigProps,
  MessageType,
  NotificationPlacement,
  NotificationConfigProps,
  NotificationType,
  notificationConfig,
}

export const iconMap = {
  success: <Success />,
  info: <Info />,
  warning: <Warning />,
  error: <Error />,
}
