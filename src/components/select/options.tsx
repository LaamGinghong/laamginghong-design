import React, {
  CSSProperties,
  FC,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
} from 'react'
import domAlign from 'dom-align'

export interface OptionsProps {
  style: CSSProperties
  target: HTMLDivElement
}

const Options: FC<OptionsProps> = ({ children, style, target }) => {
  const handleClick = useCallback((e: MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation()
  }, [])

  const options = useRef<HTMLDivElement>()

  useEffect(() => {
    domAlign(options.current, target, {
      points: ['tc', 'bc'],
      overflow: { adjustX: 1, adjustY: 1 },
      targetOffset: [0, 0],
      offset: [0, 6],
    })
  }, [])

  return (
    <div className='select-wrap'>
      <div
        className='options'
        ref={options}
        style={style}
        onClick={handleClick}>
        {children}
      </div>
    </div>
  )
}

export default Options
