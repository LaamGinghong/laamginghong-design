export type DropdownTrigger = 'click' | 'hover'

export type DropdownPlacement = 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight'

export interface DropdownConfigOptions {
    trigger?: DropdownTrigger
    placement?: DropdownPlacement
    duration?: number
}

class DropdownConfig {
    private _config: DropdownConfigOptions = {
        trigger: 'click',
        placement: 'bottomRight',
        duration: 2000,
    }

    set config(data: DropdownConfigOptions) {
        Object.assign(this._config, data)
    }

    get config(): DropdownConfigOptions {
        return this._config
    }
}

export const dropdownConfig = new DropdownConfig()
