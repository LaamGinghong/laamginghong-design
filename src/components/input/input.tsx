import React, { forwardRef, InputHTMLAttributes } from 'react'
import classNames from 'classnames'
import './style.less'

const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className, ...rest }, ref) => {
  return (
    <input className={classNames('input', className)} {...rest} ref={ref} />
  )
})

Input.displayName = 'Input'

export default Input
