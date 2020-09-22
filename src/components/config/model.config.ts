import { CSSProperties } from 'react'

interface ModelConfigOptions {
  /**
   * 是否显示模态框
   */
  visible: boolean
  /**
   * 模态框样式
   */
  style: CSSProperties
  /**
   * 是否显示右上角关闭按钮
   *
   * 默认为 true
   */
  closable: boolean
  /**
   * 是否显示蒙层
   *
   * 默认为 true
   */
  mask: boolean
  /**
   * 点击蒙层是否允许关闭模态框
   *
   * 默认为 true
   */
  maskClosable: boolean
  /**
   * 模态框头部样式
   */
  headerStyle: CSSProperties
  /**
   * 模态框内容样式
   */
  bodyStyle: CSSProperties
  /**
   * 模态框底部样式
   */
  footerStyle: CSSProperties
  /**
   * 模态框宽度
   *
   * 当传入宽度为数字时，会自动带上单位 'px'
   *
   * 默认为 520
   */
  width: string | number
}

class ModelConfig {
  private config: ModelConfigOptions = {
    visible: false,
    style: {},
    closable: true,
    mask: true,
    maskClosable: true,
    headerStyle: {},
    bodyStyle: {},
    footerStyle: {},
    width: 520,
  }

  set configuration(config) {
    Object.assign(this.config, config)
  }

  get configuration() {
    return { ...this.config }
  }
}

export default new ModelConfig()
