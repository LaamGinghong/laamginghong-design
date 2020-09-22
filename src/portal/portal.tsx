import { FC } from 'react'
import { createPortal } from 'react-dom'

interface PortalProps {
  container: HTMLElement
}

const Portal: FC<PortalProps> = ({ container, children }) => {
  return createPortal(children, container)
}

export default Portal
