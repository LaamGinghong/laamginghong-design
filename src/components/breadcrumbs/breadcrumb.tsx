import React, { FC, ReactNode } from 'react'

interface BreadcrumbOptions {
  /**
   * 显示文字
   */
  text: string
  /**
   * 点击事件，返回当前 Item 的数据
   */
  onClick?(options: BreadcrumbOptions): void
  /**
   * 超链接
   *
   * 如果传入超链接并且没有 preventDefault 不为 true，则会自动进行跳转
   */
  href?: string
  /**
   * 自定义渲染，返回当前 Item 的数据，需要返回一个 ReactNode
   */
  renderItem?: (options: BreadcrumbOptions) => ReactNode
  /**
   * 禁止默认行为
   *
   * 设置为 true 时，点击面包屑不会自动进行超链接跳转
   */
  preventDefault?: boolean
}

interface BreadcrumbProps extends BreadcrumbOptions {
  /**
   * 分隔符号
   */
  separator: ReactNode
}

const Breadcrumb: FC<BreadcrumbProps> = (props) => {
  const handleClick = () => {
    const { onClick, href, preventDefault } = props
    onClick && onClick(props)
    if (preventDefault || !href) return
    window.location.href = href
  }

  const {
    renderItem = (options) => (
      <span className="link" onClick={handleClick}>
        {options.text}
      </span>
    ),
    separator,
  } = props

  return (
    <span>
      {renderItem(props)}
      <span className="separator">{separator}</span>
    </span>
  )
}

export default Breadcrumb
export type { BreadcrumbOptions }
