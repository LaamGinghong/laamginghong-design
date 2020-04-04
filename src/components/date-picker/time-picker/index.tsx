import React from 'react'
import { isNull } from 'laamginghong-utils'
import dayjs from 'dayjs'
import { BasicDatePicker, DatePickerCommonProps } from '../interface'
import Selection from '../selection'
import { Portal } from '../../portal'
import TimePickerMenu from './time-picker-menu'

export interface TimePickerProps extends DatePickerCommonProps {}

interface TimePickerState {
    open: boolean
    value: Date
}

class TimePicker extends BasicDatePicker<TimePickerProps, TimePickerState> {
    static getDerivedStateFromProps(
        props: TimePickerProps,
        state: TimePickerState,
    ): TimePickerState {
        if ('value' in props) {
            return { ...state, value: props.value }
        }
        return null
    }

    state: TimePickerState = {
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
        const { open, value } = this.state
        const { allowClear, disabled, placeholder } = this.props

        const time = isNull(value)
            ? dayjs(new Date())
                  .set('hour', 0)
                  .set('minute', 0)
                  .set('second', 0)
                  .toDate()
            : value

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
                    {open && !disabled && (
                        <TimePickerMenu
                            time={time}
                            onChange={this.__handleChange}
                            container={this.__selectionRef}
                        />
                    )}
                </Portal>
            </div>
        )
    }
}

export default TimePicker
