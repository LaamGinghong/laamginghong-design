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
  /**
   * 按钮类型
   *
   * 不传的时候是默认样式
   */
  type?: 'primary' | 'danger' | 'link'
  /**
   * 按钮本身类型
   *
   * 因为占用了原生按钮的 type 属性，所以这里使用 htmlType 代替
   */
  htmlType?: 'submit' | 'button' | 'reset'
  /**
   * 按钮是否加载中
   *
   * 加载中的按钮无法点击，相当于处于禁用状态
   */
  loading?: boolean
  /**
   * 按钮大小
   *
   * 三者之前差别为高度、字体大小以及内边距
   */
  size?: 'small' | 'large'
  /**
   * 块级按钮
   *
   * 设置为块级按钮，按钮占满当前包裹按钮容器的一整行
   */
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
