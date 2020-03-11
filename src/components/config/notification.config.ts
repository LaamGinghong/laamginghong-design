import { MessageType } from './message.config'

export type NotificationType = MessageType

export type NotificationPlacement =
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight'

export interface NotificationConfigOptions {
  duration?: number
  maxCount?: number
  placement?: NotificationPlacement
}

class NotificationConfig {
  private _config: NotificationConfigOptions = {
    duration: 3000,
    maxCount: 3,
    placement: 'topRight',
  }

  set config(value: NotificationConfigOptions) {
    Object.assign(this._config, value)
  }

  get config(): NotificationConfigOptions {
    return this._config
  }
}

export const notificationConfig = new NotificationConfig()
