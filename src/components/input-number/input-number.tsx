import React, {
    ChangeEvent,
    Component,
    CSSProperties,
    KeyboardEvent,
} from 'react'
import Big from 'big.js'
import { isEqual, isNil } from 'laamginghong-utils'
import { Input } from '../input'

interface InputNumberProps {
    value?: number
    defaultValue?: number
    onChange?: (value: number) => void
    disabled?: boolean
    max?: number
    min?: number
    precision?: number
    placeholder?: string
    style?: CSSProperties
    className?: string
    onPressEnter?: (value: number) => void
}

interface InputNumberState {
    value: string
}

const isNotCompleteNumber = (num: number): boolean =>
    Number.isNaN(num) || isNil(num)

class InputNumber extends Component<InputNumberProps, InputNumberState> {
    state: InputNumberState = {
        value: this._getValidValue(
            this._toNumberString(this.props.value ?? this.props.defaultValue),
        ),
    }

    componentDidUpdate(prevProps: Readonly<InputNumberProps>): void {
        const { value, max, min, precision } = this.props
        if (
            !isEqual(prevProps.value, value) ||
            !isEqual(prevProps.max, max) ||
            !isEqual(prevProps.min, min) ||
            !isEqual(prevProps.precision, precision)
        ) {
            const validValue = this._getValidValue(this._toNumberString(value))
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({ value: validValue }, (): void => {
                const { onChange } = this.props
                onChange &&
                    onChange(validValue === '' ? undefined : +validValue)
            })
        }
    }

    private _handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target
        this.setState({ value }, (): void => {
            const { onChange } = this.props
            onChange && onChange(this._getCurrentValidValue(value))
        })
    }

    private _handleBlur = (): void => {
        const value = parseFloat(this.state.value)
        if (Number.isNaN(value)) {
            this.setState({ value: '' })
        } else {
            this.setState({ value: this._getValidValue(value.toString()) })
        }
    }

    private _handlePressEnter = (
        event: KeyboardEvent<HTMLInputElement>,
    ): void => {
        if (event.nativeEvent.code === 'Enter') {
            const { onPressEnter } = this.props
            const value = this._getCurrentValidValue(this.state.value)
            onPressEnter && onPressEnter(value)
        }
    }

    private _toNumberString(value: number): string {
        if (isNotCompleteNumber(value)) {
            return ''
        }
        const val = Big(value)
        if ('precision' in this.props) {
            const { precision } = this.props
            return val.toFixed(precision)
        }
        return val.toString()
    }

    private _getValidValue(value: string): string {
        if (value === '') {
            return value
        }
        let val = value
        const { max, min, precision } = this.props
        if (!isNil(max)) {
            if (Big(val).gt(max)) {
                val = max.toString()
            }
        }
        if (!isNil(min)) {
            if (Big(val).lt(min)) {
                val = min.toString()
            }
        }
        if (!isNil(precision)) {
            return Big(val).toFixed(precision)
        }
        return Big(val).toString()
    }

    private _getCurrentValidValue(value: string): number {
        if (Number.isNaN(parseFloat(value))) {
            return undefined
        }
        return +Big(this._getValidValue(parseFloat(value).toString()))
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
        const { value } = this.state
        const { disabled, placeholder, style, className } = this.props
        return (
            <Input
                value={value}
                onChange={this._handleChange}
                disabled={disabled}
                placeholder={placeholder}
                style={style}
                className={className}
                onBlur={this._handleBlur}
                onKeyPress={this._handlePressEnter}
            />
        )
    }
}

export { InputNumber, InputNumberProps }
