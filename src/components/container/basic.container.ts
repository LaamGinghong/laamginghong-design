import { unmountComponentAtNode } from 'react-dom'

export default class BasicContainer {
    private static _container: HTMLDivElement

    protected static __create(id: string): HTMLDivElement {
        if (!this._container) {
            this._container = document.createElement('div')
            this._container.setAttribute('id', id)
            document.body.appendChild(this._container)
        }
        return this._container
    }

    protected static __destroy(): void {
        if (!this._container) {
            return
        }
        unmountComponentAtNode(this._container)
        document.body.removeChild(this._container)
        this._container = null
    }
}
