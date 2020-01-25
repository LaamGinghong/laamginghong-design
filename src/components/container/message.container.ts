import { BasicContainer } from './basic.container'

export class MessageContainer extends BasicContainer {
  static create(id: string): HTMLElement {
    return this._create(id)
  }

  static destroy(): void {
    this._destroy()
  }
}
