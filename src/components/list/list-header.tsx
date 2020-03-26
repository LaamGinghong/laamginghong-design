import React, { FC, ReactNode } from 'react'

export interface ListHeaderProps {
    header: string | ReactNode
}

const ListHeader: FC<ListHeaderProps> = ({ header }) => {
    return <div className='list-header'>{header}</div>
}

export default ListHeader
