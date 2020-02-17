import React, {
  FC,
  MouseEvent,
  MutableRefObject,
  ReactNodeArray,
  useCallback,
  useEffect,
  useRef,
} from 'react'
import './style.less'
import domAlign from 'dom-align'
import { PopoverPlacement } from '../config'
import { placementMap } from './placement'

export interface PopupProps {
  placement: PopoverPlacement
  container: MutableRefObject<HTMLElement>
}

const Popup: FC<PopupProps> = ({ children, placement, container }) => {
  const [title, content] = children as ReactNodeArray
  const popupRef = useRef<HTMLDivElement>()

  useEffect(() => {
    domAlign(popupRef.current, container.current, placementMap[placement])
  }, [])

  const handleClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }, [])

  return (
    <div className='popover' onClick={handleClick}>
      <div className='popup' ref={popupRef}>
        {title && <div className='popup-title'>{title}</div>}
        <div className='popup-content'>{content}</div>
      </div>
    </div>
  )
}

export default Popup
