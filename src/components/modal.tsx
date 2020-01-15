import React, { Component, ReactNode } from 'react'
import ReactDOM from 'react-dom'
import ModalFooter from './modal-footer'
import ModalClose from './modal-close'
import ModalPortal from './modal-portal'
import './style.scss'

interface ModalProps {
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

export let node: HTMLDivElement

export default class Modal extends Component<ModalProps> {
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

  static show = (config: ModalProps): void => {
    node = document.createElement('div')
    document.body.appendChild(node)
    const { onCancel } = config

    function handleClose(e: boolean): void {
      ReactDOM.unmountComponentAtNode(node)
      document.body.removeChild(node)
      onCancel && onCancel(e)
    }

    ReactDOM.render(<Modal {...config} onCancel={handleClose} />, node)
  }

  handleOk = () => {
    const { onOk } = this.props
    onOk && onOk()
  }

  handleCancel = () => {
    const { onCancel, visible } = this.props
    onCancel && onCancel(!visible)
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
    const width =
      typeof this.props.width === 'number'
        ? `${this.props.width}px`
        : this.props.width

    return (
      <ModalPortal visible={visible}>
        <div className='modal-wrap'>
          {mask && (
            <div
              className='modal-mask'
              onClick={maskClosable ? this.handleCancel : undefined}
            />
          )}
          <div className='modal' style={{ width }}>
            <div className='modal-content'>
              {closable && <ModalClose onClick={this.handleCancel} />}
              {title !== null && <div className='modal-header'>{title}</div>}
              <div className='modal-body'>{children}</div>
              {footer && (
                <ModalFooter
                  okButton={okButton}
                  cancelButton={cancelButton}
                  onCancel={this.handleCancel}
                  onOk={this.handleOk}
                />
              )}
            </div>
          </div>
        </div>
      </ModalPortal>
    )
  }
}

export { ModalProps }
