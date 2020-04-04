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
    value: Date
}

class DatePicker extends BasicDatePicker<DatePickerProps, DatePickerState> {
    static defaultProps = {
        format: 'YYYY-MM-DD',
        disabledDate: (): boolean => false,
        showToday: true,
    }

    static getDerivedStateFromProps(
        props: DatePickerProps,
        state: DatePickerState,
    ): DatePickerState {
        if ('value' in props) {
            return { ...state, value: props.value }
        }
        return null
    }

    state: DatePickerState = {
        open: false,
        value: this.props.value ?? this.props.defaultValue,
    }

    private _handleChange = (date: Date, open?: boolean): void => {
        const { onChange } = this.props
        if (!('value' in this.props)) {
            this.setState({ value: date })
        }
        this.setState({ open }, (): void => {
            onChange && onChange(date)
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
            allowClear,
            placeholder,
            format,
            disabled,
            disabledDate,
            showToday,
            showTime,
        } = this.props
        const { open, value } = this.state

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
