import { unmountComponentAtNode } from 'react-dom'

export class BasicContainer {
  private static _container: HTMLElement

  protected static _create(id: string): HTMLElement {
    if (!this._container) {
      this._container = document.createElement('div')
      this._container.setAttribute('id', id)
      document.body.appendChild(this._container)
    }
    return this._container
  }

  protected static _destroy(): void {
    unmountComponentAtNode(this._container)
    document.body.removeChild(this._container)
    this._container = null
  }
}
