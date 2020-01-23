import React, { FC } from 'react'
import { IconProps } from './index'

const Warning: FC<IconProps> = ({ width = 24 }) => {
  return (
    <svg viewBox='0 0 1024 1024' width={width}>
      <path
        d='M512 64C264.64 64 64 264.64 64 512c0 247.424 200.64 448 448 448 247.488 0 448-200.576 448-448C960 264.64 759.488 64 512 64zM512 768c-26.432 0-48-21.504-48-48S485.568 672 512 672c26.624 0 48 21.504 48 48S538.624 768 512 768zM560 528C560 554.56 538.624 576 512 576 485.568 576 464 554.56 464 528l0-224C464 277.44 485.568 256 512 256c26.624 0 48 21.44 48 48L560 528z'
        fill='#faad14'
      />
    </svg>
  )
}

export default Warning
