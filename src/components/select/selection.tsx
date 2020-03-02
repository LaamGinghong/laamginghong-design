import React, {
  Component,
  CSSProperties,
  MouseEvent,
  ReactNode,
  ReactNodeArray,
  Ref,
} from 'react'
import { OptionProps } from './option'
import classNames from 'classnames'
import {
  CloseOutlined,
  CloseCircleFilled,
  DownOutlined,
} from '@ant-design/icons'
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
  maxCountText?: string
  renderSelection?: (e: OptionProps<T>) => ReactNode
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

  private _handleClear = (e: MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation()
    const { onClear } = this.props
    onClear()
  }

  private _handleClose = (
    e: MouseEvent<HTMLElement>,
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

  private _renderSelectionMultiple = (): ReactNodeArray => {
    const { maxCount, selected, maxCountText, renderSelection } = this.props
    if (maxCount) {
      const result = (selected as OptionProps<T>[])
        .slice(0, maxCount)
        .map((item, index) => (
          <Flex
            alignItems='center'
            className='select-selection-content-multiple-item'
            key={index}>
            {renderSelection ? renderSelection(item) : item.name}
            <CloseOutlined
              className='select-selection-content-multiple-item-icon'
              onClick={(event): void => this._handleClose(event, item)}
            />
          </Flex>
        ))
      if ((selected as OptionProps<T>[]).length > maxCount) {
        result.push(
          <Flex
            alignItems='center'
            className='select-selection-content-multiple-item'
            key='more'>
            {maxCountText ??
              `and ${(selected as OptionProps<T>[]).length - maxCount} more`}
          </Flex>,
        )
      }
      return result
    }
    return (selected as OptionProps<T>[]).map((item, index) => (
      <Flex
        alignItems='center'
        className='select-selection-content-multiple-item'
        key={index}>
        {renderSelection ? renderSelection(item) : item.name}
        <CloseOutlined
          className='select-selection-content-multiple-item-icon'
          onClick={(event): void => this._handleClose(event, item)}
        />
      </Flex>
    ))
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
      renderSelection,
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
            style={{
              lineHeight: (selected as OptionProps<T>[]).length
                ? 'normal'
                : '35px',
            }}
            className={classNames('select-selection-content', {
              placeholder: !(selected as OptionProps<T>[]).length,
              multiple,
            })}>
            {(selected as OptionProps<T>[]).length > 0
              ? this._renderSelectionMultiple()
              : placeholder}
          </Flex>
        ) : (
          <div
            className={classNames('select-selection-content', {
              placeholder: !selected,
            })}>
            {selected
              ? renderSelection
                ? renderSelection(selected as OptionProps<T>)
                : (selected as OptionProps<T>).name
              : placeholder}
          </div>
        )}
        <DownOutlined
          className={classNames('select-selection-icon', {
            reverse: open,
            multiple,
          })}
        />
        {allowClear &&
          selected !== undefined &&
          selected !== null &&
          !disabled &&
          !multiple && (
            <CloseCircleFilled
              onClick={this._handleClear}
              className={classNames('select-selection-icon clear', {
                multiple,
              })}
            />
          )}
      </div>
    )
  }
}

export default Selection
