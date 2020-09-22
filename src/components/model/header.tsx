import React, { CSSProperties, FC, memo, ReactNode } from 'react'
import { CloseOutlined } from '../../icon'

interface HeaderProps {
  title: ReactNode
  headerStyle: CSSProperties
  onCancel(): void
}

const Header: FC<HeaderProps> = ({ title, headerStyle, onCancel }) => {
  return (
    <div className="header" style={headerStyle}>
      {title}
      <CloseOutlined className="close" onClick={onCancel} />
    </div>
  )
}

export default memo<HeaderProps>(Header)
