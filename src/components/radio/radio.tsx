import React, { Component, FocusEvent } from 'react'
import { isNumber } from 'laamginghong-utils'
import classNames from 'classnames'
import './style.less'

export interface RadioProps {
  checked: boolean
  disabled?: boolean
  value: any
  onChecked(value: any): void
  block?: boolean
}

class Radio extends Component<RadioProps> {
  private _handleSelect = (data: FocusEvent<HTMLInputElement>): void => {
    const { value, onChecked } = this.props
    let result: string | number = data.target.value
    if (isNumber(value)) {
      result = +data.target.value
    }
    onChecked(result)
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
    const { checked, disabled, children, value, block } = this.props
    return (
      <label className={classNames('radio-wrapper', { disabled, block })}>
        <span className={classNames('radio', { checked, disabled })}>
          <input
            type='radio'
            className='radio-input'
            disabled={disabled}
            value={value}
            onFocus={this._handleSelect}
          />
          <span className='radio-inner' />
        </span>
        <span>{children}</span>
      </label>
    )
  }
}

export default Radio
