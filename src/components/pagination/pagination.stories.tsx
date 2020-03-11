import React, { ReactNode, useCallback, useState } from 'react'
import { Pagination } from './index'

export default { title: 'Pagination' }

export const common = (): ReactNode => {
  const [pageIndex, setPageIndex] = useState(1)

  const handleChange = useCallback(
    ({ pageIndex }: { pageIndex: number }): void => {
      setPageIndex(pageIndex)
    },
    [],
  )

  return (
    <Pagination pageIndex={pageIndex} total={100} onChange={handleChange} />
  )
}

export const disabled = (): ReactNode => {
  const [pageIndex, setPageIndex] = useState(1)

  const handleChange = useCallback(
    ({ pageIndex }: { pageIndex: number }): void => {
      setPageIndex(pageIndex)
    },
    [],
  )

  return (
    <Pagination
      pageIndex={pageIndex}
      total={100}
      onChange={handleChange}
      disabled
    />
  )
}

export const showTotal = (): ReactNode => {
  const [pageIndex, setPageIndex] = useState(1)

  const handleChange = useCallback(
    ({ pageIndex }: { pageIndex: number }): void => {
      setPageIndex(pageIndex)
    },
    [],
  )

  return (
    <Pagination
      pageIndex={pageIndex}
      total={100}
      onChange={handleChange}
      showTotal={(total: number): string => `共${total}条`}
    />
  )
}

export const showChanger = (): ReactNode => {
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const handleChange = useCallback(
    ({
      pageIndex,
      pageSize,
    }: {
      pageIndex: number
      pageSize: number
    }): void => {
      setPageIndex(pageIndex)
      setPageSize(pageSize)
    },
    [],
  )

  return (
    <Pagination
      pageIndex={pageIndex}
      pageSize={pageSize}
      total={100}
      onChange={handleChange}
      showQuickJumper
      showSizeChanger
    />
  )
}
