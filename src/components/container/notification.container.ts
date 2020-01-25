import { BasicContainer } from './basic.container'

export class NotificationContainer extends BasicContainer {
  static create(id: string): HTMLElement {
    return this._create(id)
  }

  static destroy(): void {
    return this._destroy()
  }
}
