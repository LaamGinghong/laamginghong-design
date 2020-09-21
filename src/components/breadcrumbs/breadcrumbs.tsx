import React, { FC } from 'react'

import type { BreadcrumbsProps } from './types'
import Breadcrumb from './breadcrumb'
import './style.less'

const Breadcrumbs: FC<BreadcrumbsProps> = ({
  breadcrumbs,
  separator = '/',
}) => {
  return (
    <div className="breadcrumbs">
      {breadcrumbs.map((value, index) => (
        <Breadcrumb
          {...value}
          key={`${value.href}${index}`}
          separator={separator}
        />
      ))}
    </div>
  )
}

export default Breadcrumbs
