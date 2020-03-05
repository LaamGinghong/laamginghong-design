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
} from '@ant-design/icons'
import './style.less'
import {
  dropdownConfig,
  DropdownConfigOptions,
  DropdownPlacement,
  DropdownTrigger,
} from './dropdown.config'

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
  dropdownConfig,
  DropdownPlacement,
  DropdownConfigOptions,
  DropdownTrigger,
}

export const iconMap = {
  success: <CheckCircleFilled className='icon success' />,
  info: <InfoCircleFilled className='icon info' />,
  warning: <WarningFilled className='icon warning' />,
  error: <CloseCircleFilled className='icon error' />,
}
