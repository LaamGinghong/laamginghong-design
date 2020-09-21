import React, { FC, ReactNode } from 'react'

import Breadcrumb from './breadcrumb'
import type { BreadcrumbOptions } from './breadcrumb'
import './style.less'

interface BreadcrumbsProps {
  /**
   * 面包屑列表
   *
   * @type {BreadcrumbOptions[]}
   */
  breadcrumbs: BreadcrumbOptions[]
  /**
   * 分隔符号
   *
   * 默认分隔符号为：'/'
   */
  separator?: ReactNode
}

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
