import React, { Component, CSSProperties, MouseEvent, Ref } from 'react'
import { OptionProps } from './option'
import classNames from 'classnames'
import { Close, CloseCircle, Down } from '../icon'
import { Flex } from '../flex'

export interface SelectionProps<T> {
  open: boolean
  multiple: boolean
  selected: OptionProps<T> | OptionProps<T>[]
  onOpen(e: boolean): void
  placeholder: string
  allowClear: boolean
  onClear(e?: T | T[]): void
  style?: CSSProperties
  disabled: boolean
  selectionRef: Ref<HTMLDivElement>
  maxCount?: number
}

class Selection<T> extends Component<SelectionProps<T>> {
  private _handleFocus = (e: MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation()
    const { disabled, onOpen, open } = this.props
    if (disabled) {
      return
    }
    onOpen(!open)
  }

  private _handleClear = (e: MouseEvent<SVGElement>): void => {
    e.stopPropagation()
    const { onClear } = this.props
    onClear()
  }

  private _handleClose = (
    e: MouseEvent<HTMLDivElement>,
    value: OptionProps<T>,
  ): void => {
    e.stopPropagation()
    const { selected, onClear } = this.props
    onClear(
      (selected as OptionProps<T>[])
        .filter(item => item.value !== value.value)
        .map(item => item.value),
    )
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
      style,
      selected,
      disabled,
      open,
      selectionRef,
      placeholder,
      allowClear,
      multiple,
    } = this.props
    return (
      <div
        ref={selectionRef}
        className={classNames('select-selection', {
          'select-selection-focus': open,
          disabled,
          multiple,
        })}
        style={style}
        onClick={this._handleFocus}>
        {multiple ? (
          <Flex
            wrap
            alignContent='start'
            alignItems='center'
            className={classNames('select-selection-content', {
              placeholder: !(selected as OptionProps<T>[]).length,
              multiple,
            })}>
            {(selected as OptionProps<T>[]).map((item, index) => (
              <Flex
                alignItems='center'
                className='select-selection-content-multiple-item'
                key={index}>
                {item.name}
                <div
                  className='select-selection-content-multiple-item-icon'
                  onClick={(event): void => this._handleClose(event, item)}>
                  <Close width={12} />
                </div>
              </Flex>
            ))}
          </Flex>
        ) : (
          <div
            className={classNames('select-selection-content', {
              placeholder: !selected,
            })}>
            {(selected as OptionProps<T>)?.name ?? placeholder}
          </div>
        )}
        <Down
          className={classNames('select-selection-icon', { reverse: open })}
        />
        {allowClear &&
          selected !== undefined &&
          selected !== null &&
          !disabled &&
          !multiple && (
            <CloseCircle
              width={14}
              onClick={this._handleClear}
              className='select-selection-icon clear'
            />
          )}
      </div>
    )
  }
}

export default Selection
