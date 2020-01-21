import React, { Component } from 'react'
import { createPortal } from 'react-dom'

interface PortalProps {
  node: HTMLDivElement
}

class Portal extends Component<PortalProps> {
  node: HTMLDivElement

  constructor(props) {
    super(props)
    const { node } = props
    this.node = node ? node : document.createElement('div')
    document.body.appendChild(this.node)
  }

  render():
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | string
    | number
    | {}
    | React.ReactNodeArray
    | React.ReactPortal
    | boolean
    | null
    | undefined {
    const { children } = this.props
    return createPortal(children, this.node)
  }
}

export default Portal
