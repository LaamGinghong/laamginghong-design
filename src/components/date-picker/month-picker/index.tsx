import React from 'react'
import { DatePickerCommonProps, BasicDatePicker } from '../interface'
import Selection from '../selection'
import { Portal } from '../../portal'
import MonthPickerMenu from './month-picker-menu'
import dayjs from 'dayjs'

export interface MonthPickerProps extends DatePickerCommonProps {
  value: Date
  onChange(date: Date): void
}

interface MonthPickerState {
  open: boolean
}

class MonthPicker extends BasicDatePicker<MonthPickerProps, MonthPickerState> {
  state: MonthPickerState = {
    open: false,
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
    const { allowClear, placeholder, value, disabled } = this.props
    const { open } = this.state

    const month = dayjs(value).month()
    const year = dayjs(value).year()
    return (
      <div className='month-picker'>
        <Selection
          focus={open}
          allowClear={allowClear}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          format='YYYY-MM'
          selectionRef={this.__selectionRef}
          onFocus={this.__handleOpen}
          onBlur={this.__handleChange}
        />
        <Portal container={this.__container}>
          {open && !disabled && (
            <MonthPickerMenu
              month={month}
              year={year}
              onSelect={this.__handleChange}
              container={this.__selectionRef}
            />
          )}
        </Portal>
      </div>
    )
  }
}

export default MonthPicker
