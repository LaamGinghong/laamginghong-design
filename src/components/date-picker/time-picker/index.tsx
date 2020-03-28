import React from 'react'
import { BasicDatePicker, DatePickerCommonProps } from '../interface'
import Selection from '../selection'
import { Portal } from '../../portal'
import TimePickerMenu from './time-picker-menu'

export interface TimePickerProps extends DatePickerCommonProps {
    value: Date
    onChange(date: Date): void
}

interface TimePickerState {
    open: boolean
}

class TimePicker extends BasicDatePicker<TimePickerProps, TimePickerState> {
    state: TimePickerState = {
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
        const { open } = this.state
        const { allowClear, disabled, placeholder, value } = this.props
        return (
            <div className='time-picker'>
                <Selection
                    focus={open}
                    allowClear={allowClear}
                    placeholder={placeholder}
                    value={value}
                    disabled={disabled}
                    format='HH:mm:ss'
                    selectionRef={this.__selectionRef}
                    onFocus={this.__handleOpen}
                    onBlur={this.__handleChange}
                />
                <Portal container={this.__container}>
                    {open && !disabled && <TimePickerMenu time={value} onChange={this.__handleChange} container={this.__selectionRef} />}
                </Portal>
            </div>
        )
    }
}

export default TimePicker
