import React, { FC, HTMLAttributes } from 'react'
import { IconProps } from './index'

const CloseCircle: FC<IconProps & HTMLAttributes<SVGElement>> = ({
  width = 24,
  ...rest
}) => {
  return (
    <svg viewBox='0 0 1025 1024' width={width} {...rest}>
      <path
        fill='#777'
        d='M513.344 0a512 512 0 1 0 0 1024 512 512 0 0 0 0-1024z m226.048 674.624l-54.528 56.896-171.52-164.928-171.392 164.928-54.592-56.896L456.576 512 287.36 349.312l54.592-56.768 171.392 164.8 171.52-164.8 54.528 56.768L570.176 512l169.216 162.624z'
      />
    </svg>
  )
}

export default CloseCircle
