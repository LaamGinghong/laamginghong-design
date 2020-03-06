import React, { FC, ReactNode, useCallback, useState } from 'react'
import classNames from 'classnames'
import './style.less'
import { Flex } from '../flex'
import PaginationItem from './pagination-item'
import {
  LeftOutlined,
  RightOutlined,
  VerticalLeftOutlined,
  VerticalRightOutlined,
} from '@ant-design/icons'
import { Select } from '../select'
import { InputNumber } from '../../index'
import { isNil } from '../../utils'

export interface PaginationProps {
  pageIndex: number
  pageSize?: number
  pageSizeOptions?: number[]
  disabled?: boolean
  hideOnSinglePage?: boolean
  showQuickJumper?: boolean
  showSizeChanger?: boolean
  total: number
  showTotal?: (total: number) => ReactNode
  onChange({
    pageIndex,
    pageSize,
  }: {
    pageIndex: number
    pageSize: number
  }): void
}

const Pagination: FC<PaginationProps> = ({
  pageIndex,
  pageSize = 10,
  pageSizeOptions = [10, 20, 30, 40, 50],
  disabled,
  hideOnSinglePage,
  showQuickJumper,
  showSizeChanger,
  total,
  showTotal,
  onChange,
}) => {
  const [jumpIndex, setJumpIndex] = useState<number>()

  const count = Math.ceil(total / pageSize)
  if (count === 1 && hideOnSinglePage) {
    return null
  }

  const split = Array.from(new Array(count).keys()).map(item => ++item)
  let list: number[]
  if (split.length <= 5) {
    list = split
  } else {
    if (pageIndex + 4 < split.length) {
      list = split.slice(pageIndex - 1, pageIndex + 4)
    } else {
      list = split.slice(split.length - 5, split.length)
    }
  }

  const handleNext = useCallback(
    (disabled: boolean): void => {
      if (disabled) {
        return
      }
      onChange({ pageIndex: pageIndex + 1, pageSize })
    },
    [pageIndex, pageSize],
  )

  const handleLast = useCallback(
    (disabled: boolean): void => {
      if (disabled) {
        return
      }
      onChange({ pageIndex: count, pageSize })
    },
    [pageIndex, pageSize],
  )

  const handlePrev = useCallback(
    (disabled: boolean): void => {
      if (disabled) {
        return
      }
      onChange({ pageIndex: pageIndex - 1, pageSize })
    },
    [pageIndex, pageSize],
  )

  const handleFirst = useCallback(
    (disabled: boolean): void => {
      if (disabled) {
        return
      }
      onChange({ pageSize, pageIndex: 1 })
    },
    [pageIndex, pageSize],
  )

  const handleSelect = useCallback((value): void => {
    onChange({ pageIndex, pageSize: value })
  }, [])

  const prevDisabled = disabled || pageIndex === 1
  const nextDisabled = disabled || pageIndex === count

  const handleChangeJumpIndex = useCallback((index: number): void => {
    setJumpIndex(index)
  }, [])

  const handleQuickJump = useCallback((index: number): void => {
    if (isNil(index)) {
      return
    }
    onChange({ pageIndex: index, pageSize })
    setJumpIndex(null)
  }, [])

  return (
    <Flex className='pagination'>
      {showTotal && (
        <Flex alignItems='center' className='pagination-total'>
          {showTotal(total)}
        </Flex>
      )}
      <PaginationItem
        className={classNames({ disabled: prevDisabled })}
        onClick={(): void => handleFirst(prevDisabled)}>
        <VerticalRightOutlined />
      </PaginationItem>
      <PaginationItem
        className={classNames({ disabled: prevDisabled })}
        onClick={(): void => handlePrev(prevDisabled)}>
        <LeftOutlined />
      </PaginationItem>
      {list.map(item => (
        <PaginationItem
          key={item}
          className={classNames({ selected: item === pageIndex })}>
          {item}
        </PaginationItem>
      ))}
      <PaginationItem
        className={classNames({ disabled: nextDisabled })}
        onClick={(): void => handleNext(nextDisabled)}>
        <RightOutlined />
      </PaginationItem>
      <PaginationItem
        className={classNames({ disabled: nextDisabled })}
        onClick={(): void => handleLast(nextDisabled)}>
        <VerticalLeftOutlined />
      </PaginationItem>
      {showSizeChanger && (
        <Select
          data={pageSizeOptions.map(v => ({ value: v, name: `${v}` }))}
          value={pageSize}
          renderSelection={(value): ReactNode => `${value.value}条/页`}
          style={{ width: '100px' }}
          onSelect={handleSelect}
        />
      )}
      {showQuickJumper && (
        <Flex alignItems='center' className='pagination-quick-jumper'>
          跳至
          <InputNumber
            value={jumpIndex}
            onChange={handleChangeJumpIndex}
            onPressEnter={handleQuickJump}
          />
          页
        </Flex>
      )}
    </Flex>
  )
}

export default Pagination
