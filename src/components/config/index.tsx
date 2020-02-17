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
import { Error, Info, Success, Warning } from '../icon'
import React from 'react'
import {
  popoverConfig,
  PopoverConfigOptions,
  PopoverTrigger,
  PopoverPlacement,
} from './popover.config'

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
  success: <Success />,
  info: <Info />,
  warning: <Warning />,
  error: <Error />,
}
