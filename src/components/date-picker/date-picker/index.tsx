import React from 'react'
import { DatePickerCommonProps, BasicDatePicker } from '../interface'
import Selection from '../selection'
import '../style.less'
import { Portal } from '../../portal'
import DatePickerMenu from './date-picker-menu'

export interface DatePickerProps extends DatePickerCommonProps {
  format?: string
  showTime?: boolean
  disabledDate?: (date: Date) => boolean
  showToday?: boolean
}

interface DatePickerState {
  open: boolean
}

class DatePicker extends BasicDatePicker<DatePickerProps, DatePickerState> {
  static defaultProps = {
    format: 'YYYY-MM-DD',
    disabledDate: (): boolean => false,
    showToday: true,
  }

  state: DatePickerState = {
    open: false,
  }

  private _handleChange = (date: Date, open?: boolean): void => {
    const { onChange } = this.props
    this.setState({ open }, () => {
      onChange(date)
    })
  }

  render():
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | string
    | number
    | {}
    | React.ReactNodeArray
    | React.ReactPortal
    | boolean
    | null
    | undefined {
    const {
      value,
      allowClear,
      placeholder,
      format,
      disabled,
      disabledDate,
      showToday,
      showTime,
    } = this.props
    const { open } = this.state
    return (
      <>
        <div className='date-picker'>
          <Selection
            selectionRef={this.__selectionRef}
            focus={open}
            value={value}
            disabled={disabled}
            allowClear={allowClear}
            placeholder={placeholder}
            format={format}
            onFocus={this.__handleOpen}
            onBlur={this._handleChange}
          />
        </div>
        <Portal container={this.__container}>
          {open && !disabled && (
            <DatePickerMenu
              container={this.__selectionRef}
              value={value}
              showToday={showToday}
              onChange={this._handleChange}
              format={format}
              showTime={showTime}
              disabledDate={disabledDate}
            />
          )}
        </Portal>
      </>
    )
  }
}

export default DatePicker
