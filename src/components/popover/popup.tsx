import React, {
  FC,
  MouseEvent,
  MutableRefObject,
  ReactNodeArray,
  useCallback,
  useLayoutEffect,
  useRef,
} from 'react'
import './style.less'
import domAlign from 'dom-align'
import { PopoverPlacement } from '../config'
import { placementMap } from './placement'

export interface PopupProps {
  placement: PopoverPlacement
  container: MutableRefObject<HTMLElement>
  onToggle(e: boolean): void
}

const Popup: FC<PopupProps> = ({
  children,
  placement,
  container,
  onToggle,
}) => {
  const [title, content] = children as ReactNodeArray
  const popupRef = useRef<HTMLDivElement>()

  useLayoutEffect((): void => {
    domAlign(popupRef.current, container.current, placementMap[placement])
  }, [])

  const handleClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }, [])

  const handleMouseEnter = useCallback(() => {
    onToggle(false)
  }, [])

  const handleMouseLeave = useCallback(() => {
    onToggle(true)
  }, [])

  return (
    <div
      className='popover'
      onClick={handleClick}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}>
      <div className='popup' ref={popupRef}>
        {title && <div className='popup-title'>{title}</div>}
        <div className='popup-content'>{content}</div>
      </div>
    </div>
  )
}

export default Popup
