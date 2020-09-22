import React, {
  ComponentProps,
  CSSProperties,
  FC,
  memo,
  MouseEvent,
  PropsWithChildren,
  useState,
} from 'react'
import { Button } from '../button'
import { isPromise } from '../../utils'

interface FooterProps {
  okButtonProps: ComponentProps<typeof Button>
  cancelButtonProps: ComponentProps<typeof Button>
  onOk(): void | Promise<void>
  onCancel(): void
  style: CSSProperties
}

const Footer: FC<FooterProps> = ({
  okButtonProps,
  cancelButtonProps,
  onOk,
  onCancel,
  style,
  children,
}) => {
  if (children) {
    return <div className="footer">{children}</div>
  }

  const [loading, setLoading] = useState(false)

  const handleOk = (event: MouseEvent<HTMLButtonElement>) => {
    const { onClick } = okButtonProps
    onClick && onClick(event)
    const result = onOk()
    if (!isPromise(result)) return
    setLoading(true)
    Promise.resolve(result).finally(() => {
      setLoading(false)
    })
  }

  const handleCancel = (event: MouseEvent<HTMLButtonElement>) => {
    const { onClick } = cancelButtonProps
    onCancel()
    onClick && onClick(event)
  }

  return (
    <div className="footer default" style={style}>
      <Button {...cancelButtonProps} onClick={handleCancel} />
      <Button {...okButtonProps} loading={loading} onClick={handleOk} />
    </div>
  )
}

export default memo<PropsWithChildren<FooterProps>>(Footer)
