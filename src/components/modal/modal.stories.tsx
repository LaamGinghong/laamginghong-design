import React, { ReactNode, useCallback } from 'react'
import Modal from './modal'
import { Button } from '../button'

export default { title: 'Modal' }

export const common = (): ReactNode => {
  return (
    <Modal title='Title'>
      <div>content</div>
    </Modal>
  )
}

export const speedCreate = (): ReactNode => {
  const handleCreate = useCallback((): void => {
    Modal.create({ content: <div>Content</div>, title: 'Title' })
  }, [])

  return <Button onClick={handleCreate}>Create</Button>
}

export const noFooter = (): ReactNode => {
  return (
    <Modal title='Title' footer={null}>
      <div>content</div>
    </Modal>
  )
}

export const loading = (): ReactNode => {
  const handleOk = useCallback((): Promise<void> => {
    return new Promise<void>(resolve => {
      setTimeout(() => {
        resolve()
      }, 2000)
    })
  }, [])

  const handleCreate = useCallback((): void => {
    Modal.create({
      content: <div>Content</div>,
      title: 'Title',
      onOk: handleOk,
    })
  }, [])

  return <Button onClick={handleCreate}>Create</Button>
}

export const noMask = (): ReactNode => {
  return (
    <>
      <Button>Button</Button>
      <Modal mask={false}>
        <div>Content</div>
      </Modal>
    </>
  )
}
