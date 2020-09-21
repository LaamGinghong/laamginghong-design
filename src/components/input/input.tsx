import React, { forwardRef, InputHTMLAttributes } from 'react'
import './style.less'

const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  return <input className="input" {...props} ref={ref} />
})

Input.displayName = 'Input'

export default Input
