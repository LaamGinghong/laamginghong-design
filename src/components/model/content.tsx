import React, { CSSProperties, FC, memo, PropsWithChildren } from 'react'
import classNames from 'classnames'

interface ContentProps {
  style: CSSProperties
  hasTitle: boolean
  hasFooter: boolean
}

const Content: FC<ContentProps> = ({
  hasTitle,
  hasFooter,
  style,
  children,
}) => {
  return (
    <div
      className={classNames('content', {
        'without-title': !hasTitle,
        'without-footer': !hasFooter,
      })}
      style={style}
    >
      {children}
    </div>
  )
}

export default memo<PropsWithChildren<ContentProps>>(Content)
