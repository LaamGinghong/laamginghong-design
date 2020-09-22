import React, { forwardRef, HTMLAttributes } from 'react'

type MaskProps = HTMLAttributes<HTMLDivElement>

const Mask = forwardRef<HTMLDivElement, MaskProps>((props, ref) => {
  return <div ref={ref} {...props} />
})

Mask.displayName = 'Mask'

export default Mask
