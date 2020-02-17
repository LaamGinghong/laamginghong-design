import React, { Component, ReactNode } from 'react'
import classNames from 'classnames'
import { Check } from '../icon'

export interface OptionProps<T> {
  disabled?: boolean
  value: T
  name: string
  renderItem?: (e: { value: T; name: string; disabled: boolean }) => ReactNode
}

class Option<T> extends Component<
  OptionProps<T> & {
    onSelect(e: T | T[]): void
    selected: T | T[]
    multiple: boolean
  }
> {
  private _handleSelect = (): void => {
    const { value, onSelect, disabled, multiple, selected } = this.props
    if (disabled) {
      return
    }
    if (multiple) {
      if ((selected as T[]).includes(value)) {
        onSelect((selected as T[]).filter(item => item !== value))
      } else {
        onSelect((selected as T[]).concat([value]))
      }
      return
    }

    onSelect(value)
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
    const { name, renderItem, selected, value, disabled, multiple } = this.props
    return (
      <div
        className={classNames('option', {
          selected: multiple
            ? (selected as T[]).includes(value)
            : selected === value,
          disabled,
          multiple,
        })}
        onClick={this._handleSelect}>
        {renderItem ? renderItem({ name, value, disabled }) : name}
        {multiple && (selected as T[]).includes(value) && (
          <div className='option-multiple-icon'>
            <Check width={14} color='#1899ff' />
          </div>
        )}
      </div>
    )
  }
}

export default Option
