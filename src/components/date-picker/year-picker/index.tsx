import React from 'react'
import dayjs from 'dayjs'
import { BasicDatePicker, DatePickerCommonProps } from '../interface'
import Selection from '../selection'
import { Portal } from '../../portal'
import YearPickerMenu from './year-picker-menu'

export interface YearPickerProps extends DatePickerCommonProps {}

interface YearPickerState {
    open: boolean
    value: Date
}

class YearPicker extends BasicDatePicker<YearPickerProps, YearPickerState> {
    static getDerivedStateFromProps(
        props: YearPickerProps,
        state: YearPickerState,
    ): YearPickerState {
        if ('value' in props) {
            return { ...state, value: props.value }
        }
        return null
    }

    state: YearPickerState = {
        open: false,
        value: this.props.value ?? this.props.defaultValue,
    }

    private _handleOpen = (): void => {
        this.setState({ open: true })
    }

    private _handleChange = (year: number): void => {
        const { value } = this.props
        this.__handleChange(dayjs(value).set('year', year).toDate())
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
        const { allowClear, placeholder, disabled } = this.props

        const year = dayjs(value ?? new Date()).year()
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
                            year={year}
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
