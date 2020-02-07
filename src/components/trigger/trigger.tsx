import {
  cloneElement,
  FC,
  ReactElement,
  useCallback,
  useRef,
  MutableRefObject,
  useEffect,
  MouseEvent,
} from 'react'
import { popoverConfig } from '../config'
const { config } = popoverConfig

export interface TriggerProps {
  trigger: TriggerType
  onTrigger(e: MutableRefObject<HTMLElement>): void
  onClose(duration: number): void
}

export type TriggerType = 'hover' | 'focus' | 'click' | null

const Trigger: FC<TriggerProps> = ({
  trigger = 'click',
  onTrigger,
  onClose,
  children,
}) => {
  useEffect(() => {
    window.addEventListener('click', (): void => {
      if (trigger === 'click') {
        onClose(0)
      }
    })
  }, [])

  const childrenRef = useRef()

  const handleClick = useCallback((e: MouseEvent<HTMLElement>): void => {
    e.stopPropagation()
    if (trigger === 'click') {
      onTrigger(childrenRef)
    }
  }, [])

  const handleHover = useCallback((): void => {
    if (trigger === 'hover') {
      onTrigger(childrenRef)
    }
  }, [])

  const handleFocus = useCallback((): void => {
    if (trigger === 'focus') {
      onTrigger(childrenRef)
    }
  }, [])

  const handleLeave = useCallback((): void => {
    if (trigger === 'hover') {
      onClose(config.duration)
    }
  }, [])

  const handleBlur = useCallback((): void => {
    if (trigger === 'focus') {
      onClose(0)
    }
  }, [])

  return cloneElement(children as ReactElement, {
    ref: childrenRef,
    onClick: handleClick,
    onMouseEnter: handleHover,
    onFocus: handleFocus,
    onMouseLeave: handleLeave,
    onBlur: handleBlur,
  })
}

export default Trigger
