export type DrawerPlacement = 'right' | 'top' | 'left' | 'bottom'

export interface DrawerConfigOptions {
  placement: DrawerPlacement
}

class DrawerConfig {
  private _config: DrawerConfigOptions = {
    placement: 'right',
  }

  get config(): DrawerConfigOptions {
    return this._config
  }

  set config(data) {
    Object.assign(this._config, data)
  }
}

export const drawerConfig = new DrawerConfig()
