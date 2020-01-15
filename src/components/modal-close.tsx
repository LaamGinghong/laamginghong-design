import React, { CSSProperties, FC } from 'react'

export interface ModalCloseProps {
  style?: CSSProperties
  onClick: () => void
}

const ModalClose: FC<ModalCloseProps> = ({ style, onClick }) => {
  return (
    <div className='modal-close' onClick={onClick}>
      <svg
        style={style}
        // @ts-ignore
        t='1579077473312'
        className='icon'
        viewBox='0 0 1024 1024'
        version='1.1'
        xmlns='http://www.w3.org/2000/svg'
        p-id='8511'
        width='24'
        height='24'>
        <path
          d='M649.179 512l212.839-212.84c37.881-37.881 37.881-99.298 0-137.179s-99.298-37.881-137.179 0L512 374.821l-212.839-212.84c-37.881-37.881-99.298-37.881-137.179 0s-37.881 99.298 0 137.179L374.821 512 161.982 724.84c-37.881 37.881-37.881 99.297 0 137.179 18.94 18.94 43.765 28.41 68.589 28.41 24.825 0 49.649-9.47 68.589-28.41L512 649.179l212.839 212.84c18.94 18.94 43.765 28.41 68.589 28.41s49.649-9.47 68.59-28.41c37.881-37.882 37.881-99.298 0-137.179L649.179 512z'
          p-id='8512'></path>
      </svg>
    </div>
  )
}

export default ModalClose
