import React, { FC } from 'react'
import classNames from 'classnames'
import './style.less'
import { LoadingForButton } from '../loading'

export interface ButtonProps {
  type?: 'primary' | 'danger' | 'link'
  disabled?: boolean
  loading?: boolean
  size?: 'small' | 'large'
  block?: boolean
  onClick?: () => void
}

const Button: FC<ButtonProps> = ({
  type,
  disabled,
  loading,
  size,
  block,
  onClick,
  children,
}) => {
  return (
    <button
      className={classNames('button', {
        'button-primary': type === 'primary',
        'button-danger': type === 'danger',
        'button-link': type === 'link',
        'button-small': size === 'small',
        'button-large': size === 'large',
        'button-block': block,
        'button-loading': loading,
      })}
      onClick={onClick}
      disabled={disabled}>
      {loading && <LoadingForButton loading={loading} />}
      {children}
    </button>
  )
}

export default Button
