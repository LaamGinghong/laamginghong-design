import React, { FC, ReactNode, useCallback, useMemo } from 'react'
import { ModalContainer } from '../container'
import { Button } from '../button'

export interface ModalFooterProps {
  loading: boolean
  onChange: (loading: boolean) => void
  okButton: string | ReactNode | null
  cancelButton: string | ReactNode | null
  onOk: () => void | Promise<void>
  onCancel: () => void
}

const ModalFooter: FC<ModalFooterProps> = ({
  loading,
  onChange,
  okButton,
  cancelButton,
  onOk,
  onCancel,
}) => {
  const handleClick = useCallback(() => {
    const result = onOk()
    if (onOk && typeof (result as Promise<void>)?.then === 'function') {
      onChange(true)
      Promise.resolve(result)
        .then(() => {
          ModalContainer.destroy()
        })
        .catch(() => {
          onChange(false)
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
