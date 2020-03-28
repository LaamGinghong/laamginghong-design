import React, { FC } from 'react'
import { Flex } from '../flex'
import { Empty } from '../icon'

interface SelectNoDataProps {
    noDataText: string
}

const SelectNoData: FC<SelectNoDataProps> = ({ noDataText = '没有数据' }) => {
    return (
        <Flex justifyContent='center' className='select-no-data'>
            <Flex direction='column'>
                <Empty />
                <span className='select-no-data-text'>{noDataText}</span>
            </Flex>
        </Flex>
    )
}

export default SelectNoData
