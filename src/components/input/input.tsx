import React, { forwardRef, InputHTMLAttributes } from 'react'
import classNames from 'classnames'
import './style.less'

const Input = forwardRef<
    HTMLInputElement,
    InputHTMLAttributes<HTMLInputElement>
>(({ className, ...rest }, ref) => {
    return (
        <input
            type='text'
            ref={ref}
            className={classNames(className, 'input')}
            {...rest}
        />
    )
})

Input.displayName = 'Input'

export default Input
