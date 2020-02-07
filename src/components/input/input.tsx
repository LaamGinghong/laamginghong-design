import React, {
  ChangeEvent,
  FC,
  forwardRef,
  InputHTMLAttributes,
  useCallback,
} from 'react'
import classNames from 'classnames'
import './style.less'

const Input: FC<InputHTMLAttributes<HTMLInputElement>> = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ value, defaultValue, onChange, disabled, className, ...rest }, ref) => {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      onChange && onChange(e)
    },
    [value],
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
})

export default Input
