import React, { FC } from 'react'
import { Close } from '../icon'

export interface ModalCloseProps {
  onClick: () => void
}

const ModalClose: FC<ModalCloseProps> = ({ onClick }) => {
  return (
    <div className='modal-close' onClick={onClick}>
      <Close />
    </div>
  )
}

export default ModalClose
