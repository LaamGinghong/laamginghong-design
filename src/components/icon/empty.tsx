import React, { FC, HTMLAttributes } from 'react'
import BaseIcon from './base-icon'

const Empty: FC<HTMLAttributes<HTMLOrSVGElement>> = props => {
  return <BaseIcon type='iconempty' {...props} />
}

export default Empty
