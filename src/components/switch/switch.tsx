import React, { FC, useCallback } from 'react'
import classNames from 'classnames'
import './style.less'
import { LoadingForSwitch } from '../loading'

export interface SwitchProps {
  loading?: boolean
  checked: boolean
  disabled?: boolean
  size?: 'small'
  checkedText?: string
  unCheckedText?: string
  onChange: (checked: boolean) => void
}

const Switch: FC<SwitchProps> = ({
  checked,
  loading,
  disabled,
  size,
  checkedText,
  unCheckedText,
  onChange,
}) => {
  const _handleClick = useCallback((): void => {
    onChange && onChange(!checked)
  }, [checked])

  return (
    <button
      disabled={disabled || loading}
      className={classNames('switch', {
        checked,
        disabled: disabled || loading,
        'switch-small': size === 'small',
      })}
      onClick={_handleClick}>
      <LoadingForSwitch loading={loading} checked={checked} size={size} />
      <span className='switch-inner'>
        {checked ? checkedText : unCheckedText}
      </span>
    </button>
  )
}

export default Switch
