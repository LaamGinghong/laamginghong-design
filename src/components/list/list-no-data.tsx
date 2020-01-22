import React, { FC } from 'react'
import { Flex } from '../flex'
import { Empty } from '../icon'

export interface ListNoDataProps {
  text: string
}

const ListNoData: FC<ListNoDataProps> = ({ text }) => {
  return (
    <Flex justifyContent='center' className='list-no-data'>
      <Flex direction='column'>
        <Empty />
        <span className='list-no-data-text'>{text}</span>
      </Flex>
    </Flex>
  )
}

export default ListNoData
