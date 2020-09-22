import React, {
  Component,
  ComponentProps,
  CSSProperties,
  MouseEvent,
  ReactNode,
} from 'react'
import { render } from 'react-dom'

import { modelConfig } from '../../config'
import { Button } from '../button'
import { Portal } from '../../utils'
import { ModelContainer } from '../../container'
import './style.less'
import Header from './header'
import { Mask } from '../../common'
import Content from './content'
import Footer from './footer'

interface ModelProps {
  /**
   * 是否显示模态框
   */
  visible: boolean
  /**
   * 模态框样式
   */
  style?: CSSProperties
  /**
   * 是否显示右上角关闭按钮
   *
   * 默认为 true
   */
  closable?: boolean
  /**
   * 是否显示蒙层
   *
   * 默认为 true
   */
  mask?: boolean
  /**
   * 点击蒙层是否允许关闭模态框
   *
   * 默认为 true
   */
  maskClosable?: boolean
  /**
   * 模态框头部样式
   */
  headerStyle?: CSSProperties
  /**
   * 模态框内容样式
   */
  bodyStyle?: CSSProperties
  /**
   * 模态框底部样式
   */
  footerStyle?: CSSProperties
  /**
   * 模态框宽度
   *
   * 当传入宽度为数字时，会自动带上单位 'px'
   *
   * 默认为 520
   */
  width?: string | number
  /**
   * 模态框标题
   *
   * 不需要显示则传入 null
   */
  title: ReactNode | null
  /**
   * 模态框底部按钮组
   *
   * 不需要显示则传入 null
   */
  footer?: ReactNode | null
  /**
   * cancel 按钮 props
   */
  cancelButtonProps?: ComponentProps<typeof Button>
  /**
   * ok 按钮 props
   */
  okButtonProps?: ComponentProps<typeof Button>
  /**
   * 点击蒙层、点击右上角关闭按钮、点击取消按钮回调函数
   */
  onCancel(): void
  /**
   * 点击确定按钮回调
   *
   * 当返回一个 Promise 的时候，可以实现异步关闭
   */
  onOk(): void | Promise<void>
}

interface ModelOptions extends Omit<ModelProps, 'visible' | 'onCancel'> {
  content: ReactNode
  onCancel?(): void
}

class Model extends Component<ModelProps> {
  static defaultProps = {
    okButtonProps: { type: 'primary', children: '确定' },
    cancelButtonProps: { children: '取消' },
  }

  static create(options: ModelOptions) {
    const { onCancel, content, ...rest } = options

    function handleCancel() {
      Model.destroy()
      onCancel && onCancel()
    }

    render(
      <Model visible onCancel={handleCancel} {...rest}>
        {content}
      </Model>,
      ModelContainer.create(),
    )
  }

  static destroy() {
    ModelContainer.destroy()
  }

  private container = ModelContainer.create()

  componentDidMount() {
    this.componentDidUpdate()
  }

  componentDidUpdate() {
    const { visible } = this.props
    if (visible) {
      document.body.setAttribute('style', 'overflow: hidden;')
    } else {
      document.body.removeAttribute('style')
    }
  }

  componentWillUnmount() {
    this.componentDidUpdate()
  }

  private handleClickBody = (event: MouseEvent) => {
    event.stopPropagation()
  }

  private handleClickMask = () => {
    const { maskClosable } = Object.assign(
      {},
      modelConfig.configuration,
      this.props,
    )
    if (!maskClosable) return
    this.handleCancel()
  }

  private handleOk = () => {
    const { onOk } = Object.assign({}, modelConfig.configuration, this.props)
    return onOk()
  }

  private handleCancel = () => {
    const { onCancel } = Object.assign(
      {},
      modelConfig.configuration,
      this.props,
    )
    onCancel()
  }

  render() {
    const {
      visible,
      mask,
      title,
      headerStyle,
      bodyStyle,
      style,
      width,
      children,
      footer,
      footerStyle,
      okButtonProps,
      cancelButtonProps,
    } = Object.assign({}, modelConfig.configuration, this.props)

    if (!visible) return null

    return (
      <Portal container={this.container}>
        <div className="model-root">
          {mask && <Mask className="model-mask" />}
          <div className="model" onClick={this.handleClickMask}>
            <div
              onClick={this.handleClickBody}
              className="body"
              style={{
                ...style,
                width: typeof width === 'number' ? `${width}px` : width,
              }}
            >
              {title !== null && (
                <Header
                  title={title}
                  headerStyle={headerStyle}
                  onCancel={this.handleCancel}
                />
              )}
              <Content
                hasTitle={title !== null}
                hasFooter={footer !== null}
                style={bodyStyle}
              >
                {children}
              </Content>
              {footer !== null && (
                <Footer
                  style={footerStyle}
                  okButtonProps={okButtonProps!}
                  cancelButtonProps={cancelButtonProps!}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                >
                  {footer}
                </Footer>
              )}
            </div>
          </div>
        </div>
      </Portal>
    )
  }
}

export default Model
