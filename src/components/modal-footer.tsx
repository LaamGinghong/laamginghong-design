import React, { FC, ReactNode, useMemo } from 'react'

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
        <button className='button button-primary' onClick={onOk}>
          {okButton}
        </button>
      )
    }

    return okButton
  }, [okButton])

  const renderCancelBtn = useMemo((): ReactNode => {
    if (cancelButton === null) {
      return
    }
    if (typeof cancelButton === 'string') {
      return (
        <button className='button' onClick={onCancel}>
          {cancelButton}
        </button>
      )
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
