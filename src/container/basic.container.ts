import { unmountComponentAtNode } from 'react-dom'

abstract class BasicContainer {
  private static container: HTMLDivElement | null

  protected static _create(id: string): HTMLDivElement {
    if (!this.container) {
      this.container = document.createElement('div')
      this.container.setAttribute('id', id)
      document.body.appendChild(this.container)
    }
    return this.container
  }

  protected static _destroy(): void {
    if (!this.container) return
    unmountComponentAtNode(this.container)
    while (this.container.children.length) {
      this.container.removeChild(this.container.firstChild!)
    }
  }
}

export default BasicContainer
