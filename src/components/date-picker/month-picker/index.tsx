import React from 'react'
import dayjs from 'dayjs'
import { DatePickerCommonProps, BasicDatePicker } from '../interface'
import Selection from '../selection'
import { Portal } from '../../portal'
import MonthPickerMenu from './month-picker-menu'

export interface MonthPickerProps extends DatePickerCommonProps {}

interface MonthPickerState {
    open: boolean
    value: Date
}

class MonthPicker extends BasicDatePicker<MonthPickerProps, MonthPickerState> {
    static getDerivedStateFromProps(
        props: MonthPickerProps,
        state: MonthPickerState,
    ): MonthPickerState {
        if ('value' in props) {
            return { ...state, value: props.value }
        }
        return null
    }

    state: MonthPickerState = {
        open: false,
        value: this.props.value ?? this.props.defaultValue,
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
        const { allowClear, placeholder, disabled } = this.props
        const { open, value } = this.state

        const month = dayjs(value ?? new Date()).month()
        const year = dayjs(value ?? new Date()).year()
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
