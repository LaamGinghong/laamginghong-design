import React, { FC } from 'react'
import { IconProps } from './index'

const Down: FC<IconProps & { className?: string }> = ({
  width = 24,
  className,
}) => {
  return (
    <svg viewBox='0 0 1024 1024' width={width} className={className}>
      <path d='M512 595.858286l206.482286-206.518857a18.285714 18.285714 0 0 1 25.892571 25.892571l-219.428571 219.428571a18.285714 18.285714 0 0 1-25.892572 0l-219.428571-219.428571a18.285714 18.285714 0 0 1 25.892571-25.892571L512 595.858286z' />
    </svg>
  )
}

export default Down
