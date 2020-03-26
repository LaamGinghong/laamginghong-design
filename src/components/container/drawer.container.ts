import BasicContainer from './basic.container'

export default class DrawerContainer extends BasicContainer {
    static create(id: string): HTMLElement {
        return this.__create(id)
    }

    static destroy(): void {
        return this.__destroy()
    }
}
