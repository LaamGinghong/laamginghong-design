export interface MessageConfigOptions {
    duration?: number
    maxCount?: number
    top?: number
}

export type MessageType = 'info' | 'success' | 'warning' | 'error'

class MessageConfig {
    private _config: MessageConfigOptions = {
        duration: 3000,
        maxCount: 3,
        top: 20,
    }

    set config(value: MessageConfigOptions) {
        Object.assign(this._config, value)
    }

    get config(): MessageConfigOptions {
        return this._config
    }
}

export const messageConfig = new MessageConfig()
