import React, { forwardRef, HTMLAttributes } from 'react'
import './style.less'

export interface FlexItemProps {
  order?: number
  flex?: 'auto' | 'none' | number | string
  alignSelf?: 'start' | 'end' | 'center' | 'baseline' | 'stretch'
}

const FlexItem = forwardRef<
  HTMLDivElement,
  FlexItemProps & HTMLAttributes<HTMLDivElement>
>(({ order = 1, flex = 'auto', alignSelf, children, ...rest }) => {
  const style: FlexItemProps = { order, flex }
  if (alignSelf) {
    style.alignSelf = alignSelf
  }

  return (
    <div style={style} {...rest}>
      {children}
    </div>
  )
})

export default FlexItem
