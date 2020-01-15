import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { node } from './modal'

export interface ModalPortalProps {
  visible: boolean
}

export default class ModalPortal extends Component<ModalPortalProps> {
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
    return visible && ReactDOM.createPortal(children, node)
  }
}
