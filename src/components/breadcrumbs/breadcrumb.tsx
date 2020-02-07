import React, { FC, ReactNode, useMemo } from 'react'

export interface BreadcrumbProps {
  text: string
  href?: string
  separator: ReactNode
  index: number
  isLast: boolean
}

const Breadcrumb: FC<BreadcrumbProps> = ({
  text,
  href,
  index,
  separator,
  isLast,
}) => {
  const renderText = useMemo(
    () => <span className='breadcrumb'>{text}</span>,
    [],
  )

  const renderLink = useMemo(
    () => (
      <a href={href} className='breadcrumb'>
        {text}
      </a>
    ),
    [],
  )

  return (
    <>
      {index > 0 && <span className='breadcrumb-separator'>{separator}</span>}
      {href && !isLast ? renderLink : renderText}
    </>
  )
}

export default Breadcrumb
