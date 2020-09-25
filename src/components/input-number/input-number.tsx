import React, {
  ChangeEvent,
  Component,
  CSSProperties,
  KeyboardEvent,
} from 'react'
import Big from 'big.js'

import { Input } from '../input'

interface InputNumberProps {
  /**
   * 输入框 value，传入值为 null 的时候输入框为空
   */
  value?: number | null
  /**
   * 输入框的默认值，其中 value 与 defaultValue 不可共存，这一点与原生 input 保持一致。
   *
   * 当使用 defaultValue 时，表示该组件为非受控组件
   */
  defaultValue?: number
  /**
   * 输入框输入时的回调函数
   *
   * 当清空输入框时，回调函数会返回 null
   */
  onChange?(value: number | null): void
  /**
   * 当输入框处于聚焦状态时，点击键盘 Enter 按键触发的回调函数
   *
   * 此时会返回输入框中的合法的值
   */
  onEnter?(value: number | null): void
  /**
   * 禁用
   */
  disabled?: boolean
  /**
   * 输入框允许输入的最大值
   *
   * 当输入超出时，会自动切换成这个值
   */
  max?: number
  /**
   * 输入框允许输入的最小值
   *
   * 当输入小于最小值时，会自动切换成这个值
   */
  min?: number
  /**
   * 精度
   *
   * 采用四舍五入的方式保存
   */
  precision?: number
  /**
   * 输入框默认显示文字
   */
  placeholder?: string
  /**
   * 内联样式
   */
  style?: CSSProperties
  /**
   * 样式表
   */
  className?: string
}

interface InputNumberState {
  value: string
}

const isNil = (value: any) => value == null

const isNotCompleteNumber = (num: number | null) =>
  Number.isNaN(num) || isNil(num)

class InputNumber extends Component<InputNumberProps, InputNumberState> {
  static defaultProps = {
    defaultValue: null,
  }

  readonly state: InputNumberState = {
    value: this.getValidValue(
      this.numberToString(
        'value' in this.props ? this.props.value! : this.props.defaultValue!,
      ),
    ),
  }

  componentDidUpdate(prevProps: Readonly<InputNumberProps>) {
    const { value, max, min, precision } = this.props
    if (
      prevProps.value !== value ||
      prevProps.max !== max ||
      prevProps.min !== min ||
      prevProps.precision !== precision
    ) {
      const validValue = this.getValidValue(this.numberToString(value!))
      this.setState({ value: validValue }, () => {
        const { onChange } = this.props
        onChange && onChange(this.getCurrentValueValid(validValue))
      })
    }
  }

  private numberToString(value: number | null): string {
    if (isNotCompleteNumber(value)) {
      return ''
    }
    const val = Big(value!)
    if ('precision' in this.props) {
      const { precision } = this.props
      return val.toFixed(precision)
    }
    return val.toString()
  }

  private getValidValue(value: string): string {
    if (value === '') return value
    let val = Big(value)
    const { max, min, precision } = this.props
    if (!isNil(max) && val.gt(max!)) {
      val = Big(max!)
    }
    if (!isNil(min) && val.lt(min!)) {
      val = Big(min!)
    }
    if (!isNil(precision)) {
      return val.toFixed(precision)
    }
    return val.toString()
  }

  private getCurrentValueValid(val: string): number | null {
    if (Number.isNaN(parseFloat(val))) {
      return null
    }
    return +Big(this.getValidValue(parseFloat(val).toString()))
  }

  private handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    this.setState({ value }, () => {
      const { onChange } = this.props
      onChange && onChange(this.getCurrentValueValid(value))
    })
  }

  private handleBlur = () => {
    const value = parseFloat(this.state.value)
    if (Number.isNaN(value)) {
      this.setState({ value: '' })
    } else {
      this.setState({ value: this.getValidValue(value.toString()) })
    }
  }

  private handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.code === 'Enter') {
      const { onEnter } = this.props
      const value = this.getCurrentValueValid(this.state.value)
      onEnter && onEnter(value)
    }
  }

  render() {
    const { value } = this.state
    const { disabled, placeholder, style, className } = this.props

    return (
      <Input
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        style={style}
        className={className}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        onKeyPress={this.handleKeyPress}
      />
    )
  }
}

export default InputNumber
