import React, { ChangeEvent, forwardRef, InputHTMLAttributes, useCallback } from 'react'
import classNames from 'classnames'
import './style.less'

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
    ({ value, defaultValue, onChange, disabled, className, ...rest }, ref) => {
        const handleChange = useCallback(
            (e: ChangeEvent<HTMLInputElement>): void => {
                onChange && onChange(e)
            },
            [onChange],
        )

        return (
            <input
                type='text'
                ref={ref}
                className={classNames(className, 'input')}
                value={value}
                onChange={handleChange}
                disabled={disabled}
                defaultValue={defaultValue}
                {...rest}
            />
        )
    },
)

Input.displayName = 'Input'

export default Input
