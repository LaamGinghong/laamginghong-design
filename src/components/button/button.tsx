import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  forwardRef,
  MouseEvent,
  useMemo,
} from 'react'
import classNames from 'classnames'

import { LoadingOutlined } from '../icon'
import './style.less'

interface ButtonProps
  extends Omit<
    DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    'type'
  > {
  type?: 'primary' | 'danger' | 'link'
  htmlType?: 'submit' | 'button' | 'reset'
  loading?: boolean
  size?: 'small' | 'large'
  block?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { onClick, children, size, type, block, htmlType, loading, ...rest },
    ref,
  ) => {
    const className = useMemo(
      () => ({
        primary: type === 'primary',
        danger: type === 'danger',
        link: type === 'link',
        small: size === 'small',
        large: size === 'large',
        block: block,
        loading: loading && type !== 'link',
      }),
      [type, block, loading],
    )

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      if (loading) return
      onClick && onClick(event)
    }

    return (
      <button
        ref={ref}
        {...rest}
        onClick={handleClick}
        type={htmlType}
        className={classNames('button', className)}
      >
        {loading && <LoadingOutlined style={{ marginRight: '10px' }} />}
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'

export default Button
