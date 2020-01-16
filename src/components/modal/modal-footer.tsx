import React, { FC, ReactNode, useMemo } from 'react'
import { Button } from '../button'

export interface ModalFooterProps {
  okButton: string | ReactNode | null
  cancelButton: string | ReactNode | null
  onOk: () => void
  onCancel: () => void
}

const ModalFooter: FC<ModalFooterProps> = ({
  okButton,
  cancelButton,
  onOk,
  onCancel,
}) => {
  const renderOkBtn = useMemo((): ReactNode => {
    if (okButton === null) {
      return
    }
    if (typeof okButton === 'string') {
      return (
        <Button type='primary' onClick={onOk}>
          {okButton}
        </Button>
      )
    }

    return okButton
  }, [okButton])

  const renderCancelBtn = useMemo((): ReactNode => {
    if (cancelButton === null) {
      return
    }
    if (typeof cancelButton === 'string') {
      return <Button onClick={onCancel}>{cancelButton}</Button>
    }

    return cancelButton
  }, [cancelButton])

  return (
    <div className='modal-footer'>
      {renderOkBtn}
      {renderCancelBtn}
    </div>
  )
}

export default ModalFooter
