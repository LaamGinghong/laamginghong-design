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
      className={classNames('btn', {
        'btn-primary': type === 'primary',
        'btn-danger': type === 'danger',
        'btn-link': type === 'link',
        'btn-small': size === 'small',
        'btn-large': size === 'large',
        'btn-block': block,
        'btn-loading': loading,
      })}
      onClick={onClick}
      disabled={disabled}>
      {loading && <LoadingForButton loading={loading} />}
      {children}
    </button>
  )
}

export default Button
