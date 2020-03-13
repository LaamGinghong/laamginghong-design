import React, { ReactElement, RefObject } from 'react'
import ListItem, { ListDataOption } from './list-item'
import ListNoData from './list-no-data'

export interface ListMenuProps<T> {
  data: ListDataOption<T>[]
  noDataText?: string
  onClick?: (ref: RefObject<HTMLLIElement>, value: T) => void
}

function ListMenu<T>(props: ListMenuProps<T>): ReactElement {
  const { data, noDataText = '没有数据' } = props

  if (!data.length) {
    return <ListNoData text={noDataText} />
  }

  function handleClick(ref: RefObject<HTMLLIElement>, value: T): void {
    const { onClick } = props
    onClick && onClick(ref, value)
  }

  return (
    <div className='list-menu'>
      <ul className='list-menu-items'>
        {data.map((item, index) => (
          <ListItem
            key={index}
            disabled={item.disabled}
            value={item.value}
            renderItem={item.renderItem}
            text={item.text}
            onClick={handleClick}
          />
        ))}
      </ul>
    </div>
  )
}

export default ListMenu
