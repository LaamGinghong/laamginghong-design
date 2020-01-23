export interface MessageConfigProps {
  duration?: number
  maxCount?: number
  top?: number
}

export type MessageType = 'info' | 'success' | 'warning' | 'error'

class MessageConfig {
  private _config: MessageConfigProps = {
    duration: 3000,
    maxCount: 3,
    top: 20,
  }

  set config(value: MessageConfigProps) {
    Object.assign(this._config, value)
  }

  get config(): MessageConfigProps {
    return this._config
  }
}

export const messageConfig = new MessageConfig()
