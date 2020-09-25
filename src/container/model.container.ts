import BasicContainer from './basic.container'

export default class ModelContainer extends BasicContainer {
  static create(): HTMLDivElement {
    return this._create('model-container')
  }

  static destroy(): void {
    document.body.removeAttribute('style')
    setTimeout(() => {
      this._destroy()
    })
  }
}
