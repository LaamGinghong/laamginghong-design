import { BasicContainer } from './basic.container'

export class ModalContainer extends BasicContainer {
  static create(id: string): HTMLElement {
    return this._create(id)
  }

  static destroy(): void {
    this._destroy()
  }
}
