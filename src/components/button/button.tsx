import React, { FC } from 'react'
import classNames from 'classnames'
import { Loading } from '../icon'
import './style.less'

export interface ButtonProps {
  type?: 'primary' | 'danger' | 'link'
  disabled?: boolean
  onClick?: () => void
  block?: boolean
  loading?: boolean
  size?: 'small' | 'large'
}

const Button: FC<ButtonProps> = ({
  type,
  children,
  disabled,
  onClick,
  size,
  loading,
  block,
}) => {
  return (
    <button
      onClick={onClick}
      className={classNames('button', {
        'button-primary': type === 'primary',
        'button-danger': type === 'danger',
        'button-link': type === 'link',
        'button-block': block,
        'button-large': size === 'large',
        'button-small': size === 'small',
        disabled: loading,
      })}
      disabled={disabled}>
      {loading && <Loading />}
      {children}
    </button>
  )
}

export default Button
