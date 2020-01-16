import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { node } from './modal'

export interface ModalPortalProps {
  visible: boolean
}

export default class ModalPortal extends Component<ModalPortalProps> {
  node: HTMLDivElement
  constructor(props: ModalPortalProps) {
    super(props)
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
    const { visible, children } = this.props
    return visible && ReactDOM.createPortal(children, this.node)
  }
}
