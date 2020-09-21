import BasicContainer from './basic.container'

export default class ModelContainer extends BasicContainer {
  static create(id: string): HTMLDivElement {
    return this._create(id)
  }

  static destroy(): void {
    this._destroy()
  }
}
