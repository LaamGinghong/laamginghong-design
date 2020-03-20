import { Component, createRef } from 'react'
import { DatePickerContainer } from '../container'

export interface DatePickerCommonProps {
  value: Date
  onChange(value: Date): void
  allowClear?: boolean
  disabled?: boolean
  placeholder?: string
}

export class BasicDatePicker<
  P extends { onChange(date: Date): void },
  S extends { open: boolean }
> extends Component<P, S> {
  protected __selectionRef = createRef<HTMLDivElement>()

  protected __container = DatePickerContainer.create('date-picker-container')

  componentDidMount(): void {
    window.addEventListener('click', this.__handleClose)
  }

  componentWillUnmount(): void {
    window.removeEventListener('click', this.__handleClose)
  }

  protected __handleOpen = (): void => {
    this.setState({ open: true })
  }

  protected __handleClose = (): void => {
    this.setState({ open: false })
  }

  protected __handleChange = (date: Date): void => {
    this.setState({ open: false }, (): void => {
      const { onChange } = this.props
      onChange(date)
    })
  }
}
