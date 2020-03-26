import React, { FC, HTMLAttributes } from 'react'
import classNames from 'classnames'

const PaginationItem: FC<HTMLAttributes<HTMLDivElement>> = ({ children, className, ...rest }) => {
    return (
        <div {...rest} className={classNames('pagination-item', className)}>
            {children}
        </div>
    )
}

export default PaginationItem
