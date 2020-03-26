import BasicContainer from './basic.container'

export default class DatePickerContainer extends BasicContainer {
    static create(id: string): HTMLDivElement {
        return this.__create(id)
    }

    static destroy(): void {
        return this.__destroy()
    }
}
