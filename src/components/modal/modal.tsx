import React, { Component, ReactNode } from 'react'
import ReactDOM from 'react-dom'
import ModalFooter from './modal-footer'
import ModalClose from './modal-close'
import { Portal } from '../portal'
import './style.less'
import { ModalContainer } from '../container'

export interface ModalProps {
  /* 显示 */
  visible?: boolean
  /* 标题，传入null表示不显示标题 */
  title?: string | ReactNode | null
  /* 宽度 */
  width?: string | number
  /* 右上角关闭按钮 */
  closable?: boolean
  /* 是否显示脚部 */
  footer?: boolean
  /* 模态框确定按钮，传入null则不显示按钮 */
  okButton?: string | ReactNode | null
  /* 模态框取消按钮，传入null则不显示按钮 */
  cancelButton?: string | ReactNode | null
  /* 蒙层 */
  mask?: boolean
  /* 点击蒙层关闭模态框 */
  maskClosable?: boolean
  /* 点击键盘esc键关闭模态框 */
  keyboardEsc?: boolean
  /* 关闭模态框事件 */
  onCancel?: (e: boolean) => void
  onOk?: () => void
}

export interface ModalState {
  loading: boolean
}

class Modal extends Component<ModalProps, ModalState> {
  static defaultProps = {
    visible: true,
    closable: true,
    width: 520,
    footer: true,
    okButton: '确定',
    cancelButton: '取消',
    mask: true,
    maskClosable: true,
  }

  static create = (config: ModalProps & { content: ReactNode }): void => {
    const { onCancel, content, ...rest } = config
    const node = ModalContainer.create('modal-container')

    function handleClose(e: boolean): void {
      Modal.destroy()
      onCancel && onCancel(e)
    }

    ReactDOM.render(
      <Modal {...rest} onCancel={handleClose}>
        {content}
      </Modal>,
      node,
    )
  }

  static destroy = (): void => {
    ModalContainer.destroy()
  }

  state = {
    loading: false,
  }

  container = ModalContainer.create('modal-container')

  private _handleOk = (): void | Promise<void> => {
    const { onOk } = this.props
    return onOk && onOk()
  }

  private _handleCancel = (): void => {
    const { loading } = this.state
    if (loading) {
      return
    }
    const { onCancel, visible } = this.props
    onCancel && onCancel(!visible)
  }

  private _handleSetLoading = (loading: boolean): void => {
    this.setState({ loading })
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
      okButton,
      footer,
      closable,
      cancelButton,
      mask,
      maskClosable,
      children,
    } = this.props
    const { loading } = this.state
    const width =
      typeof this.props.width === 'number'
        ? `${this.props.width}px`
        : this.props.width

    return (
      visible && (
        <Portal container={this.container}>
          <div className='modal-wrap'>
            {mask && (
              <div
                className='modal-mask'
                onClick={maskClosable ? this._handleCancel : undefined}
              />
            )}
            <div className='modal' style={{ width }}>
              <div className='modal-content'>
                {closable && <ModalClose onClick={this._handleCancel} />}
                {title !== null && <div className='modal-header'>{title}</div>}
                <div className='modal-body'>{children}</div>
                {footer && (
                  <ModalFooter
                    loading={loading}
                    onChange={this._handleSetLoading}
                    okButton={okButton}
                    cancelButton={cancelButton}
                    onCancel={this._handleCancel}
                    onOk={this._handleOk}
                  />
                )}
              </div>
            </div>
          </div>
        </Portal>
      )
    )
  }
}

export default Modal
