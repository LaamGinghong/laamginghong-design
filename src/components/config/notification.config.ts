import { MessageType } from './message.config'

export type NotificationType = MessageType

export type NotificationPlacement =
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight'

export interface NotificationConfigProps {
  duration?: number
  maxCount?: number
  top?: number
  bottom?: number
  placement?: NotificationPlacement
}

class NotificationConfig {
  private _config: NotificationConfigProps = {
    duration: 3000,
    maxCount: 3,
    top: 20,
    bottom: 20,
    placement: 'topRight',
  }

  set config(value: NotificationConfigProps) {
    Object.assign(this._config, value)
  }

  get config(): NotificationConfigProps {
    return this._config
  }
}

export const notificationConfig = new NotificationConfig()
