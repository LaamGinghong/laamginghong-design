import React, {
  cloneElement,
  ReactElement,
  MutableRefObject,
  MouseEvent,
  Component,
  createRef,
} from 'react'

export interface TriggerProps<T extends { duration?: number }> {
  trigger: TriggerType
  onTrigger(e: MutableRefObject<HTMLElement>): void
  onClose(duration: number): void
  config: T
}

export type TriggerType = 'hover' | 'focus' | 'click' | null

class Trigger<T extends { duration?: number }> extends Component<
  TriggerProps<T>
> {
  _childrenRef = createRef<HTMLElement>()

  constructor(props) {
    super(props)
    window.addEventListener('click', (): void => {
      const { trigger, onClose } = this.props
      if (trigger === 'click') {
        onClose(0)
      }
    })
  }

  private _handleClick = (event: MouseEvent<HTMLElement>): void => {
    event.stopPropagation()
    const { trigger, onTrigger } = this.props
    if (trigger === 'click') {
      onTrigger(this._childrenRef)
    }
  }

  private _handleHover = (): void => {
    const { trigger, onTrigger } = this.props
    if (trigger === 'hover') {
      onTrigger(this._childrenRef)
    }
  }

  private _handleFocus = (): void => {
    const { trigger, onTrigger } = this.props
    if (trigger === 'focus') {
      onTrigger(this._childrenRef)
    }
  }

  private _handleLeave = (): void => {
    const { trigger, onClose, config } = this.props
    if (trigger === 'hover') {
      onClose(config.duration)
    }
  }

  private _handleBlur = (): void => {
    const { trigger, onClose } = this.props
    if (trigger === 'focus') {
      onClose(0)
    }
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
    return cloneElement(children as ReactElement, {
      ref: this._childrenRef,
      onClick: this._handleClick,
      onMouseEnter: this._handleHover,
      onFocus: this._handleFocus,
      onMouseLeave: this._handleLeave,
      onBlur: this._handleBlur,
    })
  }
}

export default Trigger
