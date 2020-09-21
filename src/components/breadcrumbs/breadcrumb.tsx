import React, { FC } from 'react'

import type { BreadcrumbProps } from './types'

const Breadcrumb: FC<BreadcrumbProps> = (props) => {
  const handleClick = () => {
    const { onClick, href, preventDefault } = props
    onClick && onClick(props)
    if (preventDefault || !href) return
    window.location.href = href
  }

  const {
    renderItem = (options) => (
      <span className="link" onClick={handleClick}>
        {options.text}
      </span>
    ),
    separator,
  } = props

  return (
    <span>
      {renderItem(props)}
      <span className="separator">{separator}</span>
    </span>
  )
}

export default Breadcrumb
