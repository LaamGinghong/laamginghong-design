import React, {
  CSSProperties,
  forwardRef,
  HTMLAttributes,
  useMemo,
} from 'react'

interface FlexItemProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * 定义当前子元素的放大比例、缩小比例、分配多余空间前占据的主轴空间
   *
   * 默认为 '0 1 auto'
   */
  flex?: CSSProperties['flex']
  /**
   * 定义当前子元素的排列顺序
   *
   * 数字越小，排列越靠前
   *
   * 默认为 0
   */
  order?: number
  /**
   * 定义当前子元素的对齐方式
   *
   * 默认为 auto，表示继承父元素的 align-items 属性
   */
  alignSelf?:
    | 'auto'
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'baseline'
    | 'stretch'
}

const FlexItem = forwardRef<HTMLDivElement, FlexItemProps>(
  (
    {
      children,
      style = {},
      flex = '0 1 auto',
      alignSelf = 'auto',
      order = 0,
      ...rest
    },
    ref,
  ) => {
    const memoStyle = useMemo<CSSProperties>(
      () => Object.assign(style ?? {}, { flex, alignSelf, order }),
      [flex, alignSelf, order, style],
    )

    return (
      <div ref={ref} style={memoStyle} {...rest}>
        {children}
      </div>
    )
  },
)

FlexItem.displayName = 'FlexItem'

export default FlexItem
