import React, { FC, HTMLAttributes } from 'react'
import classNames from 'classnames'
import './style.less'

export interface FlexProps {
  /* display: inline-flex */
  inline?: boolean
  direction?: 'rowReverse' | 'column' | 'columnReverse'
  /* flex-wrap: wrap | wrap-reverse */
  wrap?: true | 'reverse'
  justifyContent?: 'end' | 'center' | 'spaceBetween' | 'spaceAround'
  alignItems?: 'start' | 'end' | 'center' | 'baseline'
  alignContent?: 'start' | 'end' | 'center' | 'spaceBetween' | 'spaceAround'
}

const Flex: FC<FlexProps & HTMLAttributes<HTMLDivElement>> = ({
  inline,
  direction,
  wrap,
  justifyContent,
  alignContent,
  alignItems,
  children,
  className,
  ...rest
}) => {
  return (
    <div
      {...rest}
      className={classNames('flex', className, {
        'inline-flex': inline,
        'flex-direction-row-reverse': direction === 'rowReverse',
        'flex-direction-column': direction === 'column',
        'flex-direction-column-reverse': direction === 'columnReverse',
        'flex-wrap': wrap === true,
        'flex-wrap-reverse': wrap === 'reverse',
        'justify-content-end': justifyContent === 'end',
        'justify-content-center': justifyContent === 'center',
        'justify-content-space-between': justifyContent === 'spaceBetween',
        'justify-content-space-around': justifyContent === 'spaceAround',
        'align-items-start': alignItems === 'start',
        'align-items-end': alignItems === 'end',
        'align-items-center': alignItems === 'center',
        'align-items-baseline': alignItems === 'baseline',
        'align-content-start': alignContent === 'start',
        'align-content-end': alignContent === 'end',
        'align-content-center': alignContent === 'center',
        'align-content-space-between': alignContent === 'spaceBetween',
        'align-content-space-around': alignContent === 'spaceAround',
      })}>
      {children}
    </div>
  )
}

export default Flex
