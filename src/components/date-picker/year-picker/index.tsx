import React from 'react'
import { BasicDatePicker, DatePickerCommonProps } from '../interface'
import Selection from '../selection'
import { Portal } from '../../portal'
import YearPickerMenu from './year-picker-menu'
import dayjs from 'dayjs'

export interface YearPickerProps extends DatePickerCommonProps {
  value: Date
  onChange(date: Date): void
}

interface YearPickerState {
  open: boolean
}

class YearPicker extends BasicDatePicker<YearPickerProps, YearPickerState> {
  state: YearPickerState = {
    open: false,
  }

  private _handleOpen = (): void => {
    this.setState({ open: true })
  }

  private _handleChange = (year: number): void => {
    this.setState({ open: false }, (): void => {
      const { value, onChange } = this.props
      onChange(
        dayjs(value)
          .set('year', year)
          .toDate(),
      )
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
    const { open } = this.state
    const { allowClear, placeholder, value, disabled } = this.props
    return (
      <div className='year-picker'>
        <Selection
          focus={open}
          allowClear={allowClear}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          format='YYYY'
          selectionRef={this.__selectionRef}
          onFocus={this._handleOpen}
          onBlur={this.__handleChange}
        />
        <Portal container={this.__container}>
          {open && !disabled && (
            <YearPickerMenu
              year={dayjs(value).year()}
              onChange={this._handleChange}
              container={this.__selectionRef}
            />
          )}
        </Portal>
      </div>
    )
  }
}

export default YearPicker
