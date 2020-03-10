import React, { Component } from 'react'
import classNames from 'classnames'
import './style.less'
import Checkbox from './checkbox'

export interface GroupProps {
  disabled?: boolean
  options: { label: string; value: any; disabled?: boolean }[]
  value: any[]
  onChange(value: any[]): void
  block?: boolean
}

class Group extends Component<GroupProps> {
  private _handleCheck = (value: any, checked: boolean): void => {
    const { value: selected = [], onChange } = this.props
    let result
    if (checked) {
      result = selected.concat([value])
    } else {
      result = selected.filter(item => item !== value)
    }
    onChange(Array.from(new Set(result)))
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
    const { options, disabled, value, block } = this.props
    return (
      <div className={classNames('checkbox-group', { block })}>
        {options.map((item, index) => (
          <Checkbox
            key={index}
            block={block}
            disabled={disabled || item.disabled}
            checked={value?.includes(item.value)}
            value={item.value}
            onChange={this._handleCheck}>
            {item.label}
          </Checkbox>
        ))}
      </div>
    )
  }
}

export default Group
