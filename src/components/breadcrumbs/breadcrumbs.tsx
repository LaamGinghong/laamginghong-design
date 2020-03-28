import React, { FC, ReactNode } from 'react'
import Breadcrumb from './breadcrumb'
import './style.less'

export interface BreadcrumbsProps {
    breadcrumbs: BreadcrumbsOptions[]
    separator?: ReactNode
}

interface BreadcrumbsOptions {
    text: string
    href?: string
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({ breadcrumbs, separator = '/' }) => {
    return (
        <div className='breadcrumbs'>
            {breadcrumbs.map((item, index) => (
                <Breadcrumb
                    {...item}
                    key={item.text + item.href}
                    index={index}
                    separator={separator}
                    isLast={index === breadcrumbs.length - 1}
                />
            ))}
        </div>
    )
}

export default Breadcrumbs
