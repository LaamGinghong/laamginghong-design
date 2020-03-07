import React, { Component, MouseEvent, ReactNode } from 'react'
import classNames from 'classnames'
import { Portal } from '../portal'
import { DrawerContainer } from '../container'
import { CloseOutlined } from '@ant-design/icons'
import { Flex } from '../flex'
import './style.less'
import { render } from 'react-dom'

export interface DrawerProps {
  title?: ReactNode
  closable?: boolean
  mask?: boolean
  maskClosable?: boolean
  visible?: boolean
  width?: number
  height?: number
  placement?: 'top' | 'right' | 'bottom' | 'left'
  onClose?: () => void
}

class Drawer extends Component<DrawerProps> {
  static defaultProps = {
    closable: true,
    mask: true,
    maskClosable: true,
    visible: true,
    width: 256,
    height: 256,
    placement: 'right',
  }

  static create(config: DrawerProps & { content: ReactNode }): void {
    const { content, onClose, ...rest } = config
    const container = DrawerContainer.create('drawer-container')

    function handleClose(): void {
      Drawer.destroy()
      onClose && onClose()
    }
    render(
      <Drawer {...rest} onClose={handleClose}>
        {content}
      </Drawer>,
      container,
    )
  }

  static destroy(): void {
    DrawerContainer.destroy()
  }

  container = DrawerContainer.create('drawer-container')

  private _handleClose = (): void => {
    const { onClose } = this.props
    onClose && onClose()
  }

  private _handleStopPropagation = (
    event: MouseEvent<HTMLDivElement>,
  ): void => {
    event.stopPropagation()
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
    const {
      visible,
      title,
      mask,
      maskClosable,
      closable,
      children,
      placement,
      width,
      height,
    } = this.props
    return (
      visible && (
        <Portal container={this.container}>
          <div className='drawer'>
            {mask && (
              <div
                className='drawer-mask'
                onClick={maskClosable ? this._handleClose : null}
              />
            )}
            <div
              className={classNames('drawer-content', {
                right: placement === 'right',
                top: placement === 'top',
                bottom: placement === 'bottom',
                left: placement === 'left',
              })}
              style={{
                width:
                  placement === 'left' || placement === 'right'
                    ? width
                    : 'unset',
                height:
                  placement === 'top' || placement === 'bottom'
                    ? height
                    : 'unset',
              }}
              onClick={this._handleStopPropagation}>
              {title && (
                <Flex
                  className='drawer-header'
                  justifyContent='spaceBetween'
                  alignItems='center'>
                  {title}
                  {closable && (
                    <CloseOutlined
                      className='drawer-header-close'
                      onClick={this._handleClose}
                    />
                  )}
                </Flex>
              )}
              <div className='drawer-body'>{children}</div>
            </div>
          </div>
        </Portal>
      )
    )
  }
}

export default Drawer
