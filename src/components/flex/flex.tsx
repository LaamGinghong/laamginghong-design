import React, { forwardRef, HTMLAttributes, useMemo } from 'react'
import classNames from 'classnames'

import './style.less'

interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * 行内弹性盒子
   */
  inline?: boolean
  /**
   * 子元素排列方向
   *
   * 默认为 row，水平排列
   */
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
  /**
   * 子元素是否换行
   *
   * 默认不换行
   */
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse'
  /**
   * 子元素主轴对齐方式
   *
   * 默认对齐方式为 'flex-start'
   */
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
  /**
   * 子元素交叉轴对齐方式
   *
   * 默认对齐方式为 'stretch'
   */
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'
  /**
   * 子元素多根轴线时对齐方式
   *
   * 默认对齐方式为 'stretch'
   *
   * 如果子元素只有一根轴线，该属性不起作用
   */
  alignContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'stretch'
}

const Flex = forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      children,
      wrap = 'nowrap',
      alignContent = 'stretch',
      alignItems = 'stretch',
      inline,
      direction = 'row',
      justifyContent = 'flex-start',
      className,
      ...rest
    },
    ref,
  ) => {
    const memoClass = useMemo(
      () => ({
        inline: !!inline,
        [direction]: !!direction,
        [wrap]: !!wrap,
        [`align-content-${alignContent}`]: !!alignContent,
        [`align-items-${alignItems}`]: !!alignItems,
        [`justify-content-${justifyContent}`]: !!justifyContent,
      }),
      [inline, direction, wrap, alignContent, alignItems, justifyContent],
    )

    return (
      <div
        ref={ref}
        className={classNames(className, 'flex', memoClass)}
        {...rest}
      >
        {children}
      </div>
    )
  },
)

Flex.displayName = 'Flex'

export default Flex
