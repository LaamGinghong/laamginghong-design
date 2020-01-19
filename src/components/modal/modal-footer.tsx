import React, { FC, ReactNode, useCallback, useMemo, useState } from 'react'
import { Button } from '../button'
import Modal from './modal'

export interface ModalFooterProps {
  okButton: string | ReactNode | null
  cancelButton: string | ReactNode | null
  onOk: () => void | Promise<void>
  onCancel: () => void
}

const ModalFooter: FC<ModalFooterProps> = ({
  okButton,
  cancelButton,
  onOk,
  onCancel,
}) => {
  const [loading, setLoading] = useState(false)

  const handleClick = useCallback(() => {
    const result = onOk()
    if (onOk && typeof (result as Promise<void>)?.then === 'function') {
      setLoading(true)
      Promise.resolve(result)
        .then(() => {
          Modal.destroy()
        })
        .catch(() => {
          setLoading(false)
        })
    }
  }, [onOk])

  const renderOkBtn = useMemo((): ReactNode => {
    if (okButton === null) {
      return
    }
    if (typeof okButton === 'string') {
      return (
        <Button loading={loading} type='primary' onClick={handleClick}>
          {okButton}
        </Button>
      )
    }

    return okButton
  }, [okButton, loading])

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
