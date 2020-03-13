import React, { ChangeEvent, Component } from 'react'
import classNames from 'classnames'
import './style.less'
import { isNumber } from 'laamginghong-utils'

export interface CheckboxProps {
  checked: boolean
  value: any
  disabled?: boolean
  indeterminate?: boolean
  onChange(value: any, checked: boolean): void
  block?: boolean
}

class Checkbox extends Component<CheckboxProps> {
  private _handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { onChange, value } = this.props
    const { checked } = e.target
    let result: string | number = e.target.value
    if (isNumber(value)) {
      result = +value
    }
    onChange(result, checked)
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
    const { children, value, disabled, checked, block } = this.props

    return (
      <label className={classNames('checkbox-wrapper', { disabled, block })}>
        <span className={classNames('checkbox', { checked, disabled })}>
          <input
            type='checkbox'
            value={value}
            disabled={disabled}
            className='checkbox-input'
            checked={checked}
            onChange={this._handleChange}
          />
          <span className='checkbox-inner' />
        </span>
        <span>{children}</span>
      </label>
    )
  }
}

export default Checkbox
