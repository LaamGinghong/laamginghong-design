import React, { Component } from 'react'
import { createPortal } from 'react-dom'

interface PortalProps {
    container: HTMLElement
}

class Portal extends Component<PortalProps> {
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
        const { children, container } = this.props
        return createPortal(children, container)
    }
}

export default Portal
