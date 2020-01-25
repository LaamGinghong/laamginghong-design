import React, { ChangeEvent, FC, InputHTMLAttributes, useCallback } from 'react'
import classNames from 'classnames'
import './style.less'

const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({
  value,
  defaultValue,
  onChange,
  disabled,
  className,
  ...rest
}) => {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      onChange && onChange(e)
    },
    [value],
  )

  return (
    <input
      type='text'
      className={classNames(className, 'input')}
      value={value}
      onChange={handleChange}
      disabled={disabled}
      defaultValue={defaultValue}
      {...rest}
    />
  )
}

export default Input
