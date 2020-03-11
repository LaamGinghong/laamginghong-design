export type PopoverPlacement =
  | 'top'
  | 'left'
  | 'bottom'
  | 'right'
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight'
  | 'leftTop'
  | 'leftBottom'
  | 'rightTop'
  | 'rightBottom'

export type PopoverTrigger = 'click' | 'hover' | 'focus' | null

export interface PopoverConfigOptions {
  duration?: number
  placement?: PopoverPlacement
  gap?: number
  trigger?: PopoverTrigger
}

class PopoverConfig {
  private _config: PopoverConfigOptions = {
    duration: 1000,
    placement: 'bottomLeft',
    gap: 6,
    trigger: 'click',
  }

  set config(data: PopoverConfigOptions) {
    Object.assign(this._config, data)
  }

  get config(): PopoverConfigOptions {
    return this._config
  }
}

export const popoverConfig = new PopoverConfig()
