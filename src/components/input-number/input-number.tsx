import React, { ChangeEvent, Component, CSSProperties } from 'react'
import { Input } from '../input'
import Big from 'big.js'

export interface InputNumberProps {
  value: number
  onChange(value: number): void
  disabled?: boolean
  max?: number
  min?: number
  precision?: number
  placeholder?: string
  style?: CSSProperties
  className?: string
  onPressEnter?: (value: number) => void
}

export interface InputNumberState {
  value: string
}

const isValidProps = (value: number): boolean =>
  value !== undefined && value !== null

const isNotCompleteNumber = (num: number): boolean => {
  return isNaN(Number(num)) || !isValidProps(num)
}

const isEqual = (oldValue: number, newValue: number): boolean =>
  newValue === oldValue ||
  (typeof newValue === 'number' &&
    typeof oldValue === 'number' &&
    isNaN(newValue) &&
    isNaN(oldValue))

class InputNumber extends Component<InputNumberProps, InputNumberState> {
  state: InputNumberState = {
    value: this._getValidValue(this._toNumberString(this.props.value)),
  }

  componentDidUpdate(prevProps: Readonly<InputNumberProps>): void {
    const { value, max, min } = this.props
    if (
      !isEqual(prevProps.value, value) ||
      !isEqual(prevProps.max, max) ||
      !isEqual(prevProps.min, min)
    ) {
      const validValue = this._getValidValue(this._toNumberString(value))
      this.setState({ value: validValue }, () => {
        const { onChange } = this.props
        onChange(validValue === '' ? null : +validValue)
      })
    }
  }

  private _getValidValue(value: string): string {
    if (value === '') {
      return value
    }
    let val = value
    if ('max' in this.props) {
      const { max } = this.props
      if (Big(value).gt(max)) {
        val = max.toString()
      }
    }
    if ('min' in this.props) {
      const { min } = this.props
      if (Big(value).lt(min)) {
        val = min.toString()
      }
    }
    if ('precision' in this.props) {
      const { precision } = this.props
      val = Big(val).toFixed(precision)
    }
    return val
  }

  private _getCurrentValidValue(value: string): string {
    if (!value) {
      return value
    }
    return this._getValidValue(Big(parseFloat(value)).toString())
  }

  private _toNumberString(value: number): string {
    if (!isValidProps(value)) {
      return ''
    }
    const val = Big(value)
    if (isNotCompleteNumber(+val)) {
      return ''
    }
    if ('precision' in this.props) {
      const { precision } = this.props
      return val.toFixed(precision)
    }
    return value.toString()
  }

  private _handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target
    this.setState({ value }, () => {
      const { onChange } = this.props
      if (value === '-') {
        return
      }
      onChange(value ? +this._getCurrentValidValue(value) : null)
    })
  }

  private _handleFocus = (): void => {
    window.addEventListener('keydown', this._handlePressEnter)
  }

  private _handleBlur = (): void => {
    window.removeEventListener('keydown', this._handlePressEnter)
    const { value } = this.state
    this.setState({
      value: value === '-' ? '' : this._getCurrentValidValue(value),
    })
  }

  private _handlePressEnter = (event: KeyboardEvent): void => {
    const { value } = this.state
    const { code } = event
    if (code === 'Enter') {
      const { onPressEnter } = this.props
      if (value === '-') {
        return
      }
      onPressEnter &&
        onPressEnter(value ? +this._getCurrentValidValue(value) : null)
    }
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
    const { placeholder, disabled, style, className } = this.props
    return (
      <Input
        style={style}
        className={className}
        value={value}
        placeholder={placeholder}
        onBlur={this._handleBlur}
        onFocus={this._handleFocus}
        disabled={disabled}
        onChange={this._handleChange}
      />
    )
  }
}

export default InputNumber
