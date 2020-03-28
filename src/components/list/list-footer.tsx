import React, { FC, ReactNode } from 'react'

export interface ListFooterProps {
    footer: string | ReactNode
}

const ListFooter: FC<ListFooterProps> = ({ footer }) => {
    return <div className='list-footer'>{footer}</div>
}

export default ListFooter
