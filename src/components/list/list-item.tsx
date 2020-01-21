import React, { Component, createRef, ReactNode, RefObject } from 'react'
import classNames from 'classnames'

export interface ListItemProps<T> extends ListDataOption<T> {
  onClick?: (ref: RefObject<HTMLLIElement>, value: T) => void
}

export interface ListDataOption<T> {
  value?: T
  text: string
  renderItem?: (value: ListItemProps<T>) => ReactNode
  disabled?: boolean
}

class ListItem<T> extends Component<ListItemProps<T>> {
  private _listItemRef = createRef<HTMLLIElement>()

  private _handleClick = (): void => {
    const { onClick, value, disabled } = this.props
    if (disabled) {
      return
    }
    onClick && onClick(this._listItemRef, value)
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
    const { text, renderItem, disabled } = this.props
    return (
      <li
        ref={this._listItemRef}
        className={classNames('list-menu-item', { disabled })}
        onClick={this._handleClick}>
        {renderItem ? renderItem(this.props) : text}
      </li>
    )
  }
}

export default ListItem
