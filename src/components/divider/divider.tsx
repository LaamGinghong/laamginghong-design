import React, { FC } from 'react'
import classNames from 'classnames'
import './style.less'

export interface DividerProps {
  dashed?: boolean
  direction?: 'horizontal' | 'vertical'
}

const Divider: FC<DividerProps> = ({
  dashed,
  direction = 'horizontal',
  children,
}) => {
  return (
    <div
      className={classNames('divider', {
        horizontal: direction === 'horizontal',
        vertical: direction === 'vertical',
        dashed,
        'with-text': !!children,
      })}
      role='separator'>
      <span>{children && direction === 'horizontal' && children}</span>
    </div>
  )
}

export default Divider
